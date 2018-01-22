import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsListComponent } from './payments-list/payments-list.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: PaymentsListComponent }
    ]),
  ],
  declarations: [PaymentsListComponent]
})
export class PaymentsModule { }
