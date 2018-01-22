import {Component, OnDestroy, OnInit} from '@angular/core';
import {Customer} from '../customer';
import {CustomerService} from '../customer.service';
import {NotificationService} from 'app/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {defaultDatepickerOptions} from '../../shared/shared.module';
import {DatePickerOptions} from 'ng2-datepicker';

@Component({
  selector: 'app-customer-add-edit',
  templateUrl: './customer-add-edit.component.html',
  styleUrls: ['./customer-add-edit.component.scss']
})
export class CustomerAddEditComponent implements OnInit, OnDestroy {

  customer: Customer;

  customer$: Subscription;

  private route$: Subscription;

  private id: number;

  isLoaded = false;

  datepickerOptions: DatePickerOptions = defaultDatepickerOptions;

  constructor(private customerService: CustomerService,
              private notification: NotificationService,
              private route: ActivatedRoute,
              private router: Router, ) {

    this.customer = new Customer({});
  }

  ngOnInit() {
    this.route$ = this.route.params.subscribe(params => {
      this.id = params['id'];

      if (this.id) {
        this.customer$ = this.fetchCustomer(this.id);
      } else {
        this.customer = new Customer({});
        this.isLoaded = true;
      }
    });
  }

  ngOnDestroy() {
    if (this.route$) {
      this.route$.unsubscribe();
    }

    if (this.customer$) {
      this.customer$.unsubscribe();
    }
  }

  fetchCustomer(id) {
    return this.customerService.getCustomer(id).subscribe(
      this.onLoadSuccess.bind(this),
      this.onLoadFailed.bind(this),
      () => {
        this.isLoaded = true;
      }
    );
  }

  saveCustomer() {
    const subscription = this.customerService.saveCustomer(this.customer).subscribe(
      this.onSaveSuccess.bind(this),
      this.onSaveFailed.bind(this),
      () => {
        subscription.unsubscribe();
      }
    );
  }

  onLoadSuccess(data) {
    this.customer = this.customerService.parse(new Customer(data));
  }

  onLoadFailed(response) {
    //
  }

  onSaveSuccess(response) {
    this.notification.clear().success('Pomyślnie zapisano klienta');
    this.router.navigate(['/customers']);
  }

  onSaveFailed(error) {
    //
  }
}
