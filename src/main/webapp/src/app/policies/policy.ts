import {Customer} from '../customers/customer';
import {Product} from '../products/product';
import {User} from '../users/user';
import {ProductVariant} from '../products/product-variant';
import {DateModel} from 'ng2-datepicker';

export const POLICY_STATUS_DRAFT = "DRAFT";
export const POLICY_STATUS_CLOSED = "CLOSED";

export class Policy {

  id: number;
  filename: string;
  hasFile: boolean;
  name: string;
  number: string;
  description: string;
  subject: string;
  subjectInfo: string;
  subjectDetails: string;
  status: string = POLICY_STATUS_DRAFT;

  customer: Customer = null;
  product: Product = null;
  user: User = null;

  productVariant: ProductVariant = null;

  createdAt: Date;
  updatedAt: Date;
  closedAt: Date;

  startsAt: Date;
  startsAtPicker: DateModel;
  endsAt: Date;
  endsAtPicker: DateModel;

  constructor(data) {
    Object.assign(this, data);

    this.customer = data.customer ? new Customer(data.customer) : null;
    this.product = data.product ? new Product(data.product) : null;
    this.user = data.user ? new User(data.user) : null;

    this.productVariant = data.productVariant ? new ProductVariant(data.productVariant) : null;
  }

  prepareToSave() {
    if (this.startsAtPicker) {
      this.startsAt = this.startsAtPicker.momentObj.toDate();
    }

    if (this.endsAtPicker) {
      this.endsAt = this.endsAtPicker.momentObj.toDate();
    }
  }

  statusDisplay() {

    switch (this.status) {
      case POLICY_STATUS_CLOSED:
        return "Aktywna";

      case POLICY_STATUS_DRAFT:
      default:
        return "Szkic";
    }
  }

  statusLabel() {
    switch (this.status) {
      case POLICY_STATUS_CLOSED:
        return "closed";

      case POLICY_STATUS_DRAFT:
      default:
        return "draft";
    }
  }

  isClosed() {
    return this.status == POLICY_STATUS_CLOSED;
  }

}
