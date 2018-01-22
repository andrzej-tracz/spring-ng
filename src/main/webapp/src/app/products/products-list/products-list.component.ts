import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../product';
import {ProductService} from '../product.service';
import {NotificationService} from '../../notification.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products: Product[] = null;
  products$: Subscription;

  isLoaded = false;

  constructor(private productService: ProductService, private notifications: NotificationService) {

  }

  ngOnInit() {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    if (this.products$) {
      this.products$.unsubscribe();
    }
  }

  loadProducts() {
    this.products$ = this.productService.getProducts().subscribe(
      this.onProductsLoadSuccess.bind(this),
      this.onProductsLoadFailed.bind(this)
    );
  }

  deleteProduct(product: Product) {

    if (! confirm('Na pewno chcesz to zrobić ?')) {
      return;
    }

    const subscription = this.productService.deleteProduct(product).subscribe(
      () => {
        this.products = this.products.filter((item: Product) => {
          return item !== product;
        });

        this.notifications.clear().success(`Produkt ${product.name} został usunięty`);

        if (0 === this.products.length) {
          this.loadProducts();
        }
      },
      () => {
        this.notifications.clear().error('Błąd podczas usuwania.');
      },
      () => {
        subscription.unsubscribe();
      }
    );
  }

  onProductsLoadSuccess(response) {
    this.products = response.content.map(data => {
      return new Product(data);
    });

    this.isLoaded = true;
  }

  onProductsLoadFailed(response) {
    //
  }
}
