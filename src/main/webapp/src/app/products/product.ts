import {ProductVariant} from './product-variant';
export class Product {

  id: number;
  name: string;
  description: string;
  pricePerMonth: number;
  pricePerQuarter: number;
  pricePerHalfYear: number;
  pricePerYear: number;
  isActive: boolean;
  variants: Array<ProductVariant> = [];

  createdAt: Date = null;
  updatedAt: Date = null;

  constructor(data) {
    Object.assign(this, data);

    if (data.variants) {
      this.variants = data.variants.map(item => new ProductVariant(item));
    }
  }

  getStatus() {

    if (this.isActive) {
      return ""
    }
  }
}
