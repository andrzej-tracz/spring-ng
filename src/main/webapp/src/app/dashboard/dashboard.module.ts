import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardService} from './dashboard.service';
import {DashboardComponent} from './dashboard.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [DashboardComponent],
  providers: [
    DashboardService
  ]
})
export class DashboardModule { }
