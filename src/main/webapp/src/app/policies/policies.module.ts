import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoliciesListComponent } from './policies-list/policies-list.component';
import {RouterModule} from '@angular/router';
import {PolicyService} from './policy.service';
import { PolicyAddEditComponent } from './policy-add-edit/policy-add-edit.component';
import {SharedModule} from '../shared/shared.module';
import {CustomerService} from '../customers/customer.service';
import {ProductService} from '../products/product.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: PoliciesListComponent },
      { path: 'create', component: PolicyAddEditComponent },
      { path: 'edit/:id', component: PolicyAddEditComponent },
    ]),
  ],
  declarations: [PoliciesListComponent, PolicyAddEditComponent],
  providers: [
    PolicyService,
    CustomerService,
    ProductService
  ]
})
export class PoliciesModule { }
