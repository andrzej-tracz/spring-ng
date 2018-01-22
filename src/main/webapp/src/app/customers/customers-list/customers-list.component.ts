import {Component, OnDestroy, OnInit} from '@angular/core';
import {Customer} from '../customer';
import {Subscription} from 'rxjs/Subscription';
import {CustomerService} from '../customer.service';
import {NotificationService} from '../../notification.service';


@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit, OnDestroy {

  customers: Customer[];

  customers$: Subscription;

  isLoaded = false;

  constructor(private customerService: CustomerService, private notifications: NotificationService) { }

  ngOnInit() {
    this.fetchCustomers();
  }

  fetchCustomers() {
    return this.customers$ = this.customerService.getCustomers().subscribe(
      this.onCustomersLoadSuccess.bind(this),
      this.onCustomersLoadFailed.bind(this),
      () => { this.isLoaded = true; this.customers$.unsubscribe(); }
    );
  }

  ngOnDestroy() {
    if (this.customers$) {
      this.customers$.unsubscribe();
    }
  }

  deleteCustomer(customer: Customer) {

    if (! confirm('Na pewno chcesz to zrobić ?')) {
      return;
    }

    const subscription = this.customerService.deleteCustomer(customer).subscribe(
      () => {
        this.customers = this.customers.filter((item: Customer) => {
          return item !== customer;
        });

        this.notifications.clear().success(`Klient ${customer.getFullName() || customer.email} został usunięty`);

        if (0 === this.customers.length) {
          this.fetchCustomers();
        }
      },
      () => {
        //
      },
      () => {
        subscription.unsubscribe();
      }
    );
  }

  onCustomersLoadSuccess(response) {
    this.customers = response.content.map(data => {
      return new Customer(data);
    });
  }

  onCustomersLoadFailed(response) {
    //
  }
}
