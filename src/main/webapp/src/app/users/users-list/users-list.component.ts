import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';
import {Subscription} from 'rxjs/Subscription';
import {NotificationService} from '../../notification.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  users: User[];

  users$: Subscription;

  isLoaded = false;

  constructor(private userService: UserService, private notifications: NotificationService) {
  }

  ngOnInit() {
    this.fetchUsers();
  }

  ngOnDestroy() {
    if (this.users$) {
      this.users$.unsubscribe();
    }
  }

  fetchUsers() {
    this.users$ = this.userService
      .getUsers()
      .subscribe(
        this.onUsersLoadSuccess.bind(this),
        this.onUsersLoadFailed.bind(this),
        () => {
          this.isLoaded = true;
        }
      );
  }

  onUsersLoadSuccess (response) {
    this.users = response.content.map(data => {
      return new User(data);
    });
  }

  onUsersLoadFailed (response) {
    //
  }

  deleteUser(user: User) {

    if (! confirm('Na pewno chcesz to zrobić ?')) {
      return;
    }

    const subscription = this.userService.deleteUser(user).subscribe(
      () => {
        this.users = this.users.filter((item: User) => {
          return item !== user;
        });

        this.notifications.clear().success(`Użytkownik ${user.email} został usunięty`);

        if (0 === this.users.length) {
          this.fetchUsers();
        }
      },
      () => {
        //
      },
      () => {
        subscription.unsubscribe();
      }
    );
  }

}
