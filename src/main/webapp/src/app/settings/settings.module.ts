import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsCategoriesComponent } from './settings-categories/settings-categories.component';
import {RouterModule} from '@angular/router';
import { OwnerComponent } from './owner/owner.component';
import {SharedModule} from '../shared/shared.module';
import {OwnerService} from './owner/owner.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: OwnerComponent }
    ]),
  ],
  providers: [
    OwnerService
  ],
  declarations: [SettingsCategoriesComponent, OwnerComponent]
})
export class SettingsModule { }
