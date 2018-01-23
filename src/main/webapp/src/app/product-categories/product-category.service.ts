import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { ProductCategory } from './product-category';

@Injectable()
export class ProductCategoryService {

  constructor(private apiService: ApiService) {}

  getProductCategories(page: number = 1) {

    return this.apiService.get('/product-category', {
      params: {
        page: page
      }
    });
  }

  getProductCategory(id: number | string) {

    return this.apiService.get('/product-category/show', {
      params: {
        id: id
      }
    });
  }

  saveProductCategory(category: ProductCategory) {

    if (category.id) {
      return this.apiService.put('/product-category', category);
    }

    return this.apiService.post('/product-category', category);
  }

  deleteProductCategory(category: ProductCategory) {

    return this.apiService.delete('/product-category', {
      params: {
        id: category.id
      }
    });
  }

}
