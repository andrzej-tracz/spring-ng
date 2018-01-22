export class ProductVariant {

  name: string;
  price: number;

  constructor(data = {}) {
    Object.assign(this, data);
  }

  getLabel() {
    return `${this.name} (${this.price} zł)`
  }
}
