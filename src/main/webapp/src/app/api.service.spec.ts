import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';
import {HttpModule} from '@angular/http';
import {SharedModule} from './shared/shared.module';
import {NotificationService} from './notification.service';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        NotificationService
      ],
      imports: [
        HttpModule,
        SharedModule
      ]
    });
  });

  it('should ...', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
