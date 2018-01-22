import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {ApiService} from '../api.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, ApiService]
    });
  });

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
