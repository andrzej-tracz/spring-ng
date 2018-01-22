import { browser, element, by } from 'protractor';

export class ProductsPage {

  navigateToProducts() {
    return browser.get('/products');
  }

  createNewProduct() {
    return element(by.buttonText('Dodaj produkt')).click();
  }
}
