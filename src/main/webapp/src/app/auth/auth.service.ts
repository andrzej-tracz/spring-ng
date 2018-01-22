import {Injectable, Output, EventEmitter, OnDestroy} from '@angular/core';
import { ApiService } from '../api.service';
import {Router} from '@angular/router';
import {User} from './user';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class AuthService implements OnDestroy {

  private static AUTH_KEY = 'auth_token';
  private static AUTH_USER_KEY = 'auth_user';

  private loginSubscribe: Subscription = null;
  private userDetailsSubscribe: Subscription = null;
  private apiSubscribe: Subscription = null;

  @Output() userLogin: EventEmitter<any> = new EventEmitter();
  @Output() userLogout: EventEmitter<any> = new EventEmitter();
  @Output() userLoginFailed: EventEmitter<any> = new EventEmitter();
  @Output() userLoginFinish: EventEmitter<any> = new EventEmitter();

  static getToken(): string {
    return localStorage.getItem(AuthService.AUTH_KEY);
  }

  constructor(private apiService: ApiService, private router: Router) {
    this.apiSubscribe = this.apiService.unauthorizedRequest.subscribe(
      this.onUnauthorizedRequestCall.bind(this)
    );
  }

  private unsubscribe() {
    if (this.loginSubscribe) {
      this.loginSubscribe.unsubscribe();
    }
  }

  ngOnDestroy () {
    this.unsubscribe();
  }

  onUnauthorizedRequestCall () {
    this.logout();
  }

  isAuthenticated(): boolean {
    return !! AuthService.getToken();
  }

  private setToken(token: string): void {
    localStorage.setItem(AuthService.AUTH_KEY, token);
  }

  private setUser(user: User): void {
    localStorage.setItem(AuthService.AUTH_USER_KEY, JSON.stringify(user));
    this.userLogin.emit(user);
  }

  getUser() {
    try {
      return JSON.parse(localStorage.getItem(AuthService.AUTH_USER_KEY));
    } catch (e) {
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem(AuthService.AUTH_USER_KEY);
    localStorage.removeItem(AuthService.AUTH_KEY);
    this.userLogout.emit(null);

    this.router.navigate(['/login']);
  }

  onLoginSuccess = response => {
    this.setToken(response.token);
    this.getUserDetails();
  }

  onLoginFailed = (response) => {
    this.userLoginFailed.emit(response.json());
  }

  onLoginFinish = () => {
    this.unsubscribe();
    this.userLoginFinish.emit(null);
  }

  tryLogin(email, password) {

    const data = {
      username: email,
      password: password
    };

    return this.loginSubscribe = this.apiService
      .post('/login', data)
      .subscribe(this.onLoginSuccess, this.onLoginFailed, this.onLoginFinish);
  }

  getUserDetails() {
    return this.userDetailsSubscribe = this.fetchUserDetails()
      .subscribe((response) => {
        if (response.user) {
          this.setUser(response.user);
          this.router.navigate(['']);
        }
      }, (error) => {
        this.logout();
      });
  }

  fetchUserDetails() {
    return this.apiService.get('/me')
  }
}
