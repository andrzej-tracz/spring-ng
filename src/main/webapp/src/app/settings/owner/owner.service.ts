import { Injectable } from '@angular/core';
import {ApiService} from '../../api.service';
import {Owner} from './owner';

@Injectable()
export class OwnerService {

  constructor(private apiService: ApiService) { }

  getOwner() {
    return this.apiService.get('/owner/show');
  }

  saveOwner(owner: Owner) {
    return this.apiService.put('/owner', owner);
  }

}
