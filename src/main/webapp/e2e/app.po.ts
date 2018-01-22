import { browser, element, by } from 'protractor';

export class ApiPage {

  navigateTo() {
    return browser.get('/');
  }

  getHeaderText(header = 'h1') {
    return element(by.css(header)).getText();
  }

  getLoginFormInputs() {
    return element.all(by.css('form input'));
  }

  getLoader() {
    return element.all(by.css('.loading'));
  }

  tryLogin() {
    const email = element(by.css('input[type=text]'));
    const password = element(by.css('input[type=password]'));
    const submit = element(by.css('button'));

    email.sendKeys('andrzej');
    password.sendKeys('qwerty');

    submit.click();
  }

  getJWTValue() {
    return browser.executeScript('return window.localStorage.getItem(\'auth_token\');');
  }

  dumpLocalstorage() {
    return browser.executeScript(
      `var items = []; for(var i in localStorage){items.push(localStorage[i]);} return items;`
    );
  }

  dumpBrowserConsole() {
    browser.manage().logs().get('browser').then(browserLogs => {
      browserLogs.forEach(log => {
        if (log.level.value > 900) {
          console.log('Browser Error!');
          console.log(log.message);
        }
      });
    });
  }
}
