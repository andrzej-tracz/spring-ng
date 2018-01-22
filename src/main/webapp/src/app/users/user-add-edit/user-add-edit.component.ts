import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from '../../notification.service';
import {Subscription} from 'rxjs/Subscription';
import {UserService} from '../user.service';
import {User} from '../user';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit, OnDestroy {

  user$: Subscription;
  activatedRoute$: Subscription;

  id: string | number = null;

  user: User;

  isLoaded = false;

  constructor(private userService: UserService,
              private notification: NotificationService,
              private route: ActivatedRoute,
              private router: Router,
  ) {
  }

  ngOnInit() {

    this.activatedRoute$ = this.route.params.subscribe(params => {
      this.id = params['id'];

      if (this.id) {
        this.user$ = this.fetchUser(this.id);
      } else {
        this.user = new User({});
        this.isLoaded = true;
      }
    });
  }

  ngOnDestroy() {
    if (this.user$) {
      this.user$.unsubscribe();
    }

    this.activatedRoute$.unsubscribe();
  }

  fetchUser(id) {
    return this.userService.getUser(id).subscribe(
      this.onLoadSuccess.bind(this),
      this.onLoadFailed.bind(this),
      () => {
        this.isLoaded = true;
      }
    );
  }

  saveUser() {
    const subscription = this.userService.saveUser(this.user).subscribe(
      this.onSaveSuccess.bind(this),
      this.onSaveFailed.bind(this),
      () => {
        subscription.unsubscribe();
      }
    );
  }

  onLoadSuccess(userRaw) {
    this.user = new User(userRaw);
  }

  onLoadFailed(response) {
    this.notification.clear().error('Nie można wczytać strony. Bląd połączenia.');
  }

  onSaveSuccess(response) {
    this.notification.clear().success('Pomyślnie zapisano użytkownika');
    this.router.navigate(['/users']);
  }

  onSaveFailed(error) {
    this.notification.clear().error('Wystąpił nieoczekiwany bład :(');
  }
}
