import {EventEmitter, Injectable, Output} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AuthService} from './auth/auth.service';
import {environment} from '../environments/environment';
import {NotificationService} from './notification.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ApiService {

  private baseUrl = environment.apiURL;

  @Output() unauthorizedRequest: EventEmitter<any> = new EventEmitter();

  constructor(private http: Http, private notifications: NotificationService) {
  }

  private getHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    if (AuthService.getToken()) {
      headers.append('Authorization', 'Bearer ' + AuthService.getToken());
    }

    return headers;
  }

  get(url: string, options?) {

    const opt = Object.assign({
      headers: this.getHeaders()
    }, options);

    const response = this.http.get(this.baseUrl + url, opt)
      .map(response => response.json())
      .share();

    this.handleApiResponse(response);

    return response;
  }

  post(url, body?, options?) {

    const opt = Object.assign({
      headers: this.getHeaders()
    }, options);

    const response = this.http.post(this.baseUrl + url, body, opt)
      .map(response => response.json())
      .share();

    this.handleApiResponse(response);

    return response;
  }

  put(url, body, options?) {

    const opt = Object.assign({
      headers: this.getHeaders()
    }, options);

    const response = this.http.put(this.baseUrl + url, body, opt)
      .map(response => response.json())
      .share();

    this.handleApiResponse(response);

    return response;
  }

  delete(url: string, options?) {
    const opt = Object.assign({
      headers: this.getHeaders()
    }, options);

    const response = this.http.delete(this.baseUrl + url, opt)
      .map(response => response.json())
      .share();

    this.handleApiResponse(response);

    return response;
  }

  download(url: string, options?, headers?) {
    const opt = Object.assign({
      headers: this.mergeHeaders(headers)
    }, options);

    return this.http.get(this.baseUrl + url, opt)
      .map(res => res.blob())
      .share();
  }

  private mergeHeaders(headers = {}) {
    return Object.assign(this.getHeaders(), headers);
  }

  private handleApiResponse(response: Observable<Response>) {
    const subscription = response.subscribe(
      this.handleSuccessCall.bind(this),
      this.handleFailedCall.bind(this),
      () => {
        subscription.unsubscribe();
      }
    );
  }

  private handleSuccessCall(response) {
    //
  }

  private handleFailedCall(xhr) {

    switch (xhr.status) {
      case 400:
        this.handleBadRequestResponse(xhr);
        break;

      case 401:
        this.unauthorizedRequest.emit(xhr);
        break;

      case 403:
        break;

      case 404:
        break;

      case 504:
        this.handleBadGatewayResponse(xhr);
        break;

      default:
        break;
    }
  }

  private handleBadRequestResponse(xhr) {

    let response = xhr.json();

    if (response.errors && response.errors.length) {
      this.notifications.clear();
      response.errors.forEach((error) => {
        this.notifications.error(error.message);
      });
    }

    if (response.exception && response.message && response.message.length) {
      this.notifications.clear();
      this.notifications.error(response.message);
    }
  }

  private handleBadGatewayResponse(xhr) {
    this.notifications.clear().error("Błąd połączenia.");
  }
}
