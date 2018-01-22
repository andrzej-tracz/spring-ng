import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {Customer} from './customer';
import {DateConverterService} from '../shared/date/date-converter.service';

@Injectable()
export class CustomerService {

  constructor(private apiService: ApiService, private dateConverter: DateConverterService) {
  }


  findActive() {
    return this.apiService.get('/customer/active');
  }

  getCustomers(page: number = 1) {

    return this.apiService.get('/customer', {
      params: {
        page: page
      }
    });

  }

  getCustomer(id: number | string) {
    return this.apiService.get('/customer/show', {
      params: {
        id: id
      }
    });
  }

  saveCustomer(customer: Customer) {

    customer.prepareToSave();

    if (customer.id) {
      return this.apiService.put('/customer', customer);
    }

    return this.apiService.post('/customer', customer);
  }

  deleteCustomer(customer: Customer) {
    return this.apiService.delete('/customer', {
      params: {
        id: customer.id
      }
    });
  }

  parse(customer: Customer): Customer {

    if (customer.bornDate) {
      customer.bornDatePicker = this.dateConverter.toDatePickerModel(new Date(customer.bornDate));
    }

    if (customer.drivingLicenseDate) {
      customer.drivingLicenseDatePicker = this.dateConverter.toDatePickerModel(new Date(customer.drivingLicenseDate));
    }

    if (customer.firstPoliceDate) {
      customer.firstPoliceDatePicker = this.dateConverter.toDatePickerModel(new Date(customer.firstPoliceDate));
    }

    return customer;
  }
}
