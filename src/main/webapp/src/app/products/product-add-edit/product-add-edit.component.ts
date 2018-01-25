import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Product} from '../product';
import {ProductService} from '../product.service';
import {NotificationService} from '../../notification.service';
import {ProductVariant} from '../product-variant';
import { ProductCategory } from '../../product-categories/product-category';
import { ProductCategoryService } from '../../product-categories/product-category.service';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss']
})
export class ProductAddEditComponent implements OnInit {

  private route$: Subscription;

  private id: number = null;

  product: Product;
  product$: Subscription;

  categories: ProductCategory[];
  categoriesList: Array<{id: number, text:string}>;

  categories$: Subscription;

  isLoaded = false;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private productCategoryService: ProductCategoryService,
              private notification: NotificationService,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.route$ = this.route.params.subscribe(params => {
      this.id = params['id'];

      if (this.id) {
        this.product$ = this.fetchProduct(this.id);
      } else {
        this.product = new Product({});
        if (0 == this.product.variants.length) {
          this.addProductVariant();
        }
        this.isLoaded = true;
      }

    });

    this.fetchProductCategories();
  }

  fetchProductCategories() {
    this.categories$ = this.productCategoryService.getProductCategories().subscribe(
      (response) => {
        this.categories = response.content.map((item) => new ProductCategory(item));
        this.categoriesList = this.categories.map((item) => { return {id: item.id, text: item.name} });
      }
    )
  }

  getProductCategory() {
    if (this.product && this.product.category) {
      return [{
        id: this.product.category.id,
        text: this.product.category.name
      }];
    }

    return [];
  }


  onCategorySelect(item: any) {
    this.product.category = this.categories.find(c => c.id == item.id);
  }

  fetchProduct(id) {
    return this.productService.getProduct(id).subscribe(
      this.onLoadSuccess.bind(this),
      this.onLoadFailed.bind(this),
      () => {
        this.isLoaded = true;
      }
    );
  }

  addProductVariant() {
    this.product.variants.push(
      new ProductVariant({})
    );
  }

  removeProductVariant(variant: ProductVariant) {
    this.product.variants = this.product.variants.filter(item => item != variant);
  }

  saveProduct() {
    const subscription = this.productService.saveProduct(this.product).subscribe(
      this.onSaveSuccess.bind(this),
      this.onSaveFailed.bind(this),
      () => {
        subscription.unsubscribe();
      }
    );
  }

  onLoadSuccess(data) {
    this.product = new Product(data);
  }

  onLoadFailed(response) {
    //
  }

  onSaveSuccess(response) {
    this.notification.clear().success('Pomyślnie zapisano produkt');
    this.router.navigate(['/products']);
  }

  onSaveFailed(error) {
    //
  }
}
