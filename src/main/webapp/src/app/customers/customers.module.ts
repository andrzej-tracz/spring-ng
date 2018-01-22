import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { RouterModule } from '@angular/router';
import { CustomerAddEditComponent } from './customer-add-edit/customer-add-edit.component';
import {CustomerService} from './customer.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: CustomersListComponent },
      { path: 'create', component: CustomerAddEditComponent },
      { path: 'edit/:id', component: CustomerAddEditComponent },
    ]),
  ],
  declarations: [CustomersListComponent, CustomerAddEditComponent],
  providers: [
    CustomerService
  ]
})
export class CustomersModule { }
