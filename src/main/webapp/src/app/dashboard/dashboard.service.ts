import { Injectable } from '@angular/core';
import {ApiService} from '../api.service';

@Injectable()
export class DashboardService {

  constructor(private apiService: ApiService) { }

  getDashboardData() {
    return this.apiService.get('/dashboard');
  }

}
