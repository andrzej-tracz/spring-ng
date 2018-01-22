import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import {RouterModule} from '@angular/router';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
import {ProductService} from './product.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ProductsListComponent },
      { path: 'create', component: ProductAddEditComponent },
      { path: 'edit/:id', component: ProductAddEditComponent },
    ]),
  ],
  declarations: [ProductsListComponent, ProductAddEditComponent],
  providers: [
    ProductService
  ],
})
export class ProductsModule { }
