export class ProductCategoryAttributeValue {
  name: string;
  amount: number;
}

export class ProductCategoryAttribute {
  name: string;
  shouldChangePrice: boolean = false;
  availableValues: ProductCategoryAttributeValue[] = [];
}

export class ProductCategory {

  id: number;
  name: string;

  attributes: ProductCategoryAttribute[] = [];

  createdAt: Date = null;
  updatedAt: Date = null;

  constructor(data = {}) {
    Object.assign(this, data);
  }
}
