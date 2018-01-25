import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {LoginComponent} from './auth/login/login.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MainComponent} from './main/main.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {UserGuard} from './auth/user.guard';
import {GuestGuard} from './auth/guest.guard';
import {AuthService} from './auth/auth.service';
import {ApiService} from './api.service';
import {NotificationService} from './notification.service';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';
import {DashboardModule} from './dashboard/dashboard.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { ProductCategoryService } from './product-categories/product-category.service';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [UserGuard],
    children: [
      {path: '', component: DashboardComponent},
      {path: 'customers', loadChildren: './customers/customers.module#CustomersModule'},
      {path: 'products', loadChildren: './products/products.module#ProductsModule'},
      {path: 'product-categories', loadChildren: './product-categories/product-categories.module#ProductCategoriesModule'},
      {path: 'policies', loadChildren: './policies/policies.module#PoliciesModule'},
      {path: 'payments', loadChildren: './payments/payments.module#PaymentsModule'},
      {path: 'invoices', loadChildren: './invoices/invoices.module#InvoicesModule'},
      {path: 'users', loadChildren: './users/users.module#UsersModule'},
      {path: 'settings', loadChildren: './settings/settings.module#SettingsModule'},
    ]
  },
  {
    path: 'login', component: LoginComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    SharedModule,
    HttpModule,
    DashboardModule,
    RouterModule.forRoot(routes, {
      useHash: false,
      preloadingStrategy: PreloadAllModules,
    })
  ],
  providers: [
    UserGuard,
    GuestGuard,
    AuthService,
    ApiService,
    NotificationService,
    ProductCategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
