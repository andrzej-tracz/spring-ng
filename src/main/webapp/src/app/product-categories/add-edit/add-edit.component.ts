import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProductCategoryService } from '../product-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../notification.service';
import { ProductCategory, ProductCategoryAttribute, ProductCategoryAttributeValue } from '../product-category';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {

  private route$: Subscription;

  private id: string;

  category: ProductCategory;

  category$: Subscription;

  isLoaded = false;

  constructor(private route: ActivatedRoute,
              private categories: ProductCategoryService,
              private notification: NotificationService,
              private router: Router
  ) {
  }

  ngOnInit() {

    this.route$ = this.route.params.subscribe(params => {
      this.id = params['id'];

      if (this.id) {
        this.category$ = this.fetchCategory(this.id);
      } else {
        this.category = new ProductCategory();
        this.isLoaded = true;
      }

    });

  }

  addAttributeAllowedValue(attribute: ProductCategoryAttribute) {
    return attribute.availableValues.push(new ProductCategoryAttributeValue());
  }

  removeAttributeValue(attribute: ProductCategoryAttribute, index:number) {
    attribute.availableValues = attribute.availableValues.filter((value, key) => {
      return key !== index;
    })
  }

  removeCategoryAttribute(index) {
    this.category.attributes = this.category.attributes.filter((item, key) => {
      return key !== index;
    })
  }

  addCategoryAttribute() {
    this.category.attributes.push(new ProductCategoryAttribute());
  }

  fetchCategory(id: string) {

    return this.categories.getProductCategory(id).subscribe(
      this.onLoadSuccess.bind(this),
      this.onLoadFailed.bind(this),
      () => {
        this.isLoaded = true;
      }
    );
  }

  saveCategory() {
    const subscription = this.categories.saveProductCategory(this.category).subscribe(
      this.onSaveSuccess,
      this.onSaveFailed,
      () => {
        subscription.unsubscribe();
      }
    );
  }

  onLoadSuccess(data) {
    this.category = new ProductCategory(data);
  }

  onLoadFailed(response) {
    //
  }

  onSaveSuccess = (response) => {
    this.notification.clear().success('Pomyślnie zapisano kategorie');
    this.router.navigate(['/product-categories']);
  };

  onSaveFailed = (error) => {
    //
  };

}
