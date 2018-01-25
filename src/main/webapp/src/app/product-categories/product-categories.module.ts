import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ListComponent },
      { path: 'create', component: AddEditComponent },
      { path: 'edit/:id', component: AddEditComponent },
    ]),
  ],
  declarations: [AddEditComponent, ListComponent],
  providers: [
    //
  ]
})
export class ProductCategoriesModule { }
