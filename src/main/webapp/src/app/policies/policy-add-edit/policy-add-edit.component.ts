import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Policy} from '../policy';
import {ActivatedRoute, Router} from '@angular/router';
import {PolicyService} from '../policy.service';
import {NotificationService} from '../../notification.service';
import {CustomerService} from '../../customers/customer.service';
import {ProductService} from '../../products/product.service';
import {Product} from '../../products/product';
import {Customer} from '../../customers/customer';
import {Observable} from 'rxjs/Observable';
import {defaultDatepickerOptions} from '../../shared/shared.module';

@Component({
  selector: 'app-policy-add-edit',
  templateUrl: './policy-add-edit.component.html',
  styleUrls: ['./policy-add-edit.component.scss']
})
export class PolicyAddEditComponent implements OnInit, OnDestroy {

  private route$: Subscription;

  private id: number = null;

  datepickerOptions = defaultDatepickerOptions

  policy: Policy;
  policy$: Subscription;

  customers: Customer[];
  products: Product[];

  private productsList:Array<any> = [];
  private productVariantsList:Array<any> = [];
  private customerList:Array<any> = [];

  data$: Subscription;

  isLoaded = false;

  private waitingForPdf = false;

  constructor(private route: ActivatedRoute,
              private policies: PolicyService,
              private customerService: CustomerService,
              private productService: ProductService,
              private notification: NotificationService,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.route$ = this.route.params.subscribe(params => {
      this.id = params['id'];

      if (this.id) {
        this.policy$ = this.fetchPolicy(this.id);
      } else {
        this.policy = new Policy({});
        this.data$ = this.fetchData();
      }

    });
  }

  ngOnDestroy(): void {
    if (this.data$) {
      this.data$.unsubscribe();
    }
  }

  fetchData() {
    return Observable.forkJoin([
      this.productService.findActiveProducts(),
      this.customerService.findActive()
    ]).subscribe(response => {

      this.products = response[0].content.map(item => {
        return new Product(item);
      });
      this.productsList = this.products.map((item) => { return {id: item.id, text: item.name} });

      this.customers = response[1].content.map(item => {
        return new Customer(item);
      });
      this.customerList = this.customers.map((item) => { return {id: item.id, text: item.getFullName()} });

      this.isLoaded = true;
    });
  }

  markPolicyAsClosed(policy: Policy) {

    if (!confirm("Czy na pewno chcesz potwierdzić tę polisę?")) {
      return;
    }

    let closed$ = this.policies.markAsClosed(policy).subscribe(
      (response) => {
        this.notification.clear().success('Polisa została potwierdzona');
        this.router.navigate(['/policies']);
      },
      (error) => {
        //
      },
      () => {
        closed$.unsubscribe();
      }
    )
  }

  fetchPolicy(id) {
    return this.policies.getPolicy(id).subscribe(
      this.onLoadSuccess.bind(this),
      this.onLoadFailed.bind(this),
      () => {
        this.data$ = this.fetchData();
      }
    );
  }

  savePolicy() {
    const subscription = this.policies.savePolicy(this.policy).subscribe(
      this.onSaveSuccess.bind(this),
      this.onSaveFailed.bind(this),
      () => {
        subscription.unsubscribe();
      }
    );
  }

  onLoadSuccess(data) {
    this.policy = this.policies.parse(new Policy(data));

    this.productVariantsList = this.policy.product.variants.map(item => {
      return {
        id: item.name,
        text: item.getLabel()
      }
    });

    if (this.waitingForPdf && this.policy.hasFile) {
      this.notification.clear().success("Polisa została wygenerowana");
      this.waitingForPdf = false;
    }
  }

  onLoadFailed(response) {
    //
  }

  onSaveSuccess(response) {
    this.notification.clear().success('Pomyślnie zapisano polisę');
    this.router.navigate(['/policies']);
  }

  onSaveFailed(error) {
    //
  }

  getPolicyProduct() {
    if (this.policy && this.policy.product) {

      let product = this.policy.product;
      return [{
        id: product.id,
        text: product.name
      }];
    }

    return [];
  }

  onProductSelected(item: any):void {
    let product = this.products.find(p => p.id == item.id);

    this.productVariantsList = product.variants.map(item => {
      return {
        id: item.name,
        text: item.getLabel()
      }
    });

    this.policy.product = product;
    this.policy.productVariant = null;
  }

  getPolicyCustomer() {
    if (this.policy && this.policy.customer) {
      return [{
        id: this.policy.customer.id,
        text: this.policy.customer.getFullName()
      }];
    }

    return [];
  }

  onCustomerSelected(item: any):void {
    this.policy.customer = this.customers.find(c => c.id == item.id);
  }

  getPolicyProductVariant() {
    if (this.policy.productVariant) {
      return [{
        id: this.policy.productVariant.name,
        text: this.policy.productVariant.getLabel()
      }];
    }

    return [];
  }

  onProductVariantSelected(item) {
    this.policy.productVariant = this.policy.product.variants.find(c => c.name == item.id);
  }

  generateDocument() {
    let subscription: Subscription = null;

    subscription = this.policies.generateDocument(this.policy).subscribe(
      () => {
        this.notification.clear().info("Polisa zostanie wygenerowana w ciągu kilku sekund");

        this.waitingForPdf = true;
        setTimeout(() => {
          this.ngOnInit();
        }, 5000)
      },
      () => {

      },
      () => {
        subscription.unsubscribe()
      }
    );
  }

  downloadPDF() {
    this.policies.downloadPDF(this.policy);
  }
}
