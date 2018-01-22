import { Injectable } from '@angular/core';
import {ApiService} from '../api.service';
import {User} from './user';

@Injectable()
export class UserService {

  constructor(private apiService: ApiService) { }

  findActive() {
    return this.apiService.get('/user/active');
  }

  getUsers(page: number = 1) {

    return this.apiService.get('/user', {
      params: {
        page: page
      }
    });

  }

  getUser(id: number | string) {
    return this.apiService.get('/user/show', {
      params: {
        id: id
      }
    });
  }

  saveUser(user: User) {

    if (user.id) {
      return this.apiService.put('/user', user);
    }

    return this.apiService.post('/user', user);
  }

  deleteUser(user: User) {
    return this.apiService.delete('/user', {
      params: {
        id: user.id
      }
    });
  }

}
