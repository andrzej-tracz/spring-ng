import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import { User } from '../auth/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isExpanded = false;

  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

}
