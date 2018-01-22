import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs/Subscription';
import {NotificationService} from '../../notification.service';

interface IResponseFormError {
  field: string;
  validation: string;
  message: string;
}

interface IFailedLoginResponse {
  errors: IResponseFormError[];
  message?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

  isLoginPending = false;

  errorsSubscription: Subscription;
  finishSubscription: Subscription;

  rememberedLogin: string = null;

  constructor(private authService: AuthService, private notification: NotificationService) {
  }

  ngOnInit() {
    this.finishSubscription = this.authService.userLoginFinish.subscribe(() => {
      //
    });

    this.errorsSubscription = this.authService.userLoginFailed.subscribe((response: IFailedLoginResponse) => {
      this.isLoginPending = false;
      this.notification.clear();

      if (response.errors && response.errors.length) {
        response.errors.forEach((item) => {
          this.notification.error(item.message);
        });
      } else {
        if (response.message) {
          this.notification.error(response.message);
        }
      }
    });
  }

  ngOnDestroy() {
    this.finishSubscription.unsubscribe();
    this.errorsSubscription.unsubscribe();
  }

  tryLogin(login: string, password: string) {

    if (! login.length || ! password.length) {
      this.notification.clear().error('Wprawadź login i hasło');
      return;
    }

    this.isLoginPending = true;
    this.rememberedLogin = login;

    this.authService.tryLogin(login, password);
  }

}
