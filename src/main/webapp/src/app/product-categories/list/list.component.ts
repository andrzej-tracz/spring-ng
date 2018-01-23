import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductCategory } from '../product-category';
import { Subscription } from 'rxjs/Subscription';
import { ProductCategoryService } from '../product-category.service';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  categories: ProductCategory[] = null;

  isLoaded = false;

  categories$: Subscription = null;

  constructor(private productCategories: ProductCategoryService, private notifications: NotificationService) { }

  ngOnInit() {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    if (this.categories$) {
      this.categories$.unsubscribe();
    }
  }

  loadProducts() {
    this.categories$ = this.productCategories.getProductCategories().subscribe(
      this.onCategoriesLoadSuccess,
      this.onCategoriesLoadFailed,
      () => {
        this.isLoaded = true;
      }
    );
  }


  deleteProductCategory(category: ProductCategory) {

    if (!confirm("Na pewno?")) {
      return;
    }

    const subscription = this.productCategories.deleteProductCategory(category).subscribe(
      () => {
        this.categories = this.categories.filter((item: ProductCategory) => {
          return item !== category;
        });

        this.notifications.clear().success(`Kategoria ${category.name} została usunięta`);

        if (0 === this.categories.length) {
          this.loadProducts();
        }
      },
      () => {
        this.notifications.clear().error('Błąd podczas usuwania.');
      },
      () => {
        subscription.unsubscribe();
      }
    )
  }

  onCategoriesLoadSuccess = (response) => {
    this.categories = response.content.map(data => {
      return new ProductCategory(data);
    });
  };

  onCategoriesLoadFailed = () => {

  };

}
