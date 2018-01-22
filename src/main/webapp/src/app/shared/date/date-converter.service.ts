import { Injectable } from '@angular/core';
import { DateModel } from 'ng2-datepicker';
import * as moment from 'moment';

@Injectable()
export class DateConverterService {

  constructor() { }

  toDatePickerModel(date: Date) {

    let momentModel = moment(date);

    return new DateModel({
      day: date.getDay().toString(),
      month: date.getMonth().toString(),
      year: date.getFullYear().toString(),
      formatted: momentModel.format('DD-MM-YYYY'),
      momentObj: momentModel
    })
  }
}
