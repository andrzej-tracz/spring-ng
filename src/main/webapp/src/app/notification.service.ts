import { Injectable } from '@angular/core';
import {ToasterService} from 'angular2-toaster';

interface NotificationServiceInterface {

  /**
   * Display info notification
   *
   * @param message
   */
  info(message: string): void;

  /**
   * Display success notification
   *
   * @param message
   */
  success(message: string): void;

  /**
   * Display warning notification
   *
   * @param message
   */
  warning(message: string): void;

  /**
   * Display error notification
   *
   * @param message
   */
  error(message: string): void;

  /**
   * Clear existing notifications
   */
  clear(): void | NotificationServiceInterface;
}

@Injectable()
export class NotificationService implements NotificationServiceInterface {

  constructor(private toastService: ToasterService) { }

  info(message: string) {
    this.toastService.pop('info', message);
  }

  success(message: string) {
    this.toastService.pop('success', message);
  }

  warning(message: string) {
    this.toastService.pop('warning', message);
  }

  error(message: string) {
    this.toastService.pop('error', message);
  }

  clear() {
    this.toastService.clear();

    return this;
  }

}
