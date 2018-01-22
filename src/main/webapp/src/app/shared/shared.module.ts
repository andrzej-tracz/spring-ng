import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ToasterModule} from 'angular2-toaster';
import {ChartModule} from 'ng2-chartjs2';
import {CustomFormsModule} from 'ng2-validation';
import {DatePickerModule, DatePickerOptions} from 'ng2-datepicker';
import {DateConverterService} from './date/date-converter.service';
import { UiSwitchModule } from 'ng2-ui-switch';
import {SelectModule} from 'ng2-select';
import { TextFieldComponent } from './form/text-field/text-field.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
  declarations: [
    TextFieldComponent
  ],
  exports: [
    FormsModule,
    ToasterModule,
    ChartModule,
    CustomFormsModule,
    DatePickerModule,
    UiSwitchModule,
    SelectModule,
    TextFieldComponent
  ],
  providers: [
    DateConverterService
  ]
})
export class SharedModule {
}

export const defaultDatepickerOptions = new DatePickerOptions({
  autoApply: true,
  style: 'normal',
  locale: 'PL',
  firstWeekdaySunday: false,
  todayText: 'Dzisiaj',
  clearText: 'Reset',
  selectYearText: 'Wybierz datę',
  format: 'DD-MM-YYYY'
});
