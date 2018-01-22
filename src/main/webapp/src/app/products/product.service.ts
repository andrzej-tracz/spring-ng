import { Injectable } from '@angular/core';
import {ApiService} from '../api.service';
import {Product} from './product';

@Injectable()
export class ProductService {

  constructor(private apiService: ApiService) { }


  findActiveProducts() {
    return this.apiService.get('/product/active');
  }

  getProducts(page: number = 1) {

    return this.apiService.get('/product', {
      params: {
        page: page
      }
    });

  }

  getProduct(id: number | string) {
    return this.apiService.get('/product/show', {
      params: {
        id: id
      }
    });
  }

  saveProduct(product: Product) {

    if (product.id) {
      return this.apiService.put('/product', product);
    }

    return this.apiService.post('/product', product);
  }

  deleteProduct(product: Product) {
    return this.apiService.delete('/product', {
      params: {
        id: product.id
      }
    });
  }

}
