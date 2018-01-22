import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersListComponent} from './users-list/users-list.component';
import {UserAddEditComponent} from './user-add-edit/user-add-edit.component';
import {RouterModule} from '@angular/router';
import {UserService} from './user.service';
import {SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: UsersListComponent},
      {path: 'create', component: UserAddEditComponent},
      {path: 'edit/:id', component: UserAddEditComponent},
    ]),
  ],
  declarations: [UsersListComponent, UserAddEditComponent],
  providers: [
    UserService
  ]
})
export class UsersModule {
}
