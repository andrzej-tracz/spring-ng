import {ApiPage} from './app.po';
import {ProductsPage} from './products.po';
import {browser} from 'protractor';

describe('Products Module', () => {

  let products: ProductsPage;
  let page: ApiPage;

  beforeEach(() => {
    page = new ApiPage();
    products = new ProductsPage();
  });

  it('should allow to enter products page', () => {
    products.navigateToProducts();
    expect(page.getHeaderText()).toContain('Produkty');
  });

  it('should redirect to add/edit products form when New Product is clicked ', () => {
    products.navigateToProducts();
    expect(page.getHeaderText()).toContain('Produkty');
    products.createNewProduct();
    browser.sleep(300);
  });

});
