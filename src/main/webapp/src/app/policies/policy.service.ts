import { Injectable } from '@angular/core';
import {ApiService} from '../api.service';
import {Policy} from './policy';
import {DateConverterService} from '../shared/date/date-converter.service';
import {NotificationService} from '../notification.service';
import {ResponseContentType} from '@angular/http';
import FileSaver from 'file-saver';

@Injectable()
export class PolicyService {

  constructor(
    private apiService: ApiService,
    private dateConverter: DateConverterService,
    private notifications: NotificationService
  ) { }

  getPolicies(page: number = 1) {

    return this.apiService.get('/policy', {
      params: {
        page: page
      }
    });

  }

  getPolicy(id: number | string) {
    return this.apiService.get('/policy/show', {
      params: {
        id: id
      }
    });
  }

  generateDocument(policy: Policy) {
    return this.apiService.post('/policy/generate', policy);
  }

  downloadPDF(policy: Policy) {

    let sub;

    let options = {
      params: {
        id: policy.id
      },
      responseType: ResponseContentType.Blob
    };

    return sub = this.apiService.download('/policy/download', options).subscribe(
      (data) => {
        let blob = new Blob([data], {type: 'application/pdf'});
        // let url= window.URL.createObjectURL(blob);
        // window.open(url);

        let filename = policy.name.trim().replace(" ", "-");
        FileSaver.saveAs(blob, `${filename}.pdf`);
      },
      error => {
        this.notifications.clear().error(error.message || "Wystąpił błąd podczas pobierania PDF")
      },
      () => {
        sub.unsubscribe();
      }
    );
  }


  savePolicy(policy: Policy) {

    policy.prepareToSave();

    if (policy.id) {
      return this.apiService.put('/policy', policy);
    }

    return this.apiService.post('/policy', policy);
  }

  markAsClosed(policy: Policy) {
    return this.apiService.put('/policy/mark-as-closed', policy);
  }

  deletePolicy(policy: Policy) {
    return this.apiService.delete('/policy', {
      params: {
        id: policy.id
      }
    });
  }

  parse(policy: Policy): Policy {

    if (policy.startsAt) {
      policy.startsAtPicker = this.dateConverter.toDatePickerModel(new Date(policy.startsAt));
    }

    if (policy.endsAt) {
      policy.endsAtPicker = this.dateConverter.toDatePickerModel(new Date(policy.endsAt));
    }

    return policy;
  }
}
