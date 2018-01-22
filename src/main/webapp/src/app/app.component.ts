import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  isLoaded = false;

  private authCheck$ :Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authCheck$ = this.authService.fetchUserDetails().subscribe(
      () => {
        // success
      },
      () => {
        this.isLoaded = true;
      },
      () => {
        this.isLoaded = true;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.authCheck$) {
      this.authCheck$.unsubscribe();
    }
  }

}
