import { ApiPage } from './app.po';
import {browser} from 'protractor';

describe('Auth Module', () => {

  let page: ApiPage;

  beforeEach(() => {
    page = new ApiPage();
  });

  it('should display message to login when user is not logged', () => {
    page.navigateTo();
    expect(page.getHeaderText('h3')).toBe('Witaj, Zaloguj się aby rozpocząć');
    expect(page.getLoginFormInputs().count()).toBe(2);
  });

  it('should display dashboard after success login', () => {
    page.tryLogin();
    browser.waitForAngularEnabled();
    page.dumpBrowserConsole();
    page.dumpLocalstorage();

    page.getJWTValue().then((token: string) => {
      console.log(token);
    });

    expect(page.getHeaderText('h1')).toContain('Podsumowanie');
  });

  it('should store JWT token in localStorage when login is success', () => {
    page.getJWTValue().then((token: string) => {
      expect(token.length).toBeGreaterThan(20);
    });
  });

});
