import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Owner} from './owner';
import {OwnerService} from './owner.service';
import {Subscription} from 'rxjs/Subscription';
import {NotificationService} from '../../notification.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss'],
})
export class OwnerComponent implements OnInit, OnDestroy {

  isLoaded = false;

  owner: Owner = new Owner();
  owner$: Subscription;

  constructor(private location: Location, private ownerService: OwnerService, private notifications: NotificationService) { }

  ngOnInit() {
    this.owner$ = this.ownerService.getOwner().subscribe(
      this.onSuccessLoad.bind(this),
      this.onFailedLoad.bind(this),
      () => {
        this.isLoaded = true;
      }
    )
  }

  onSuccessLoad(response) {
    this.owner = new Owner(response);
  }

  onFailedLoad(error) {
    //
  }

  ngOnDestroy(): void {
    if (this.owner$) {
      this.owner$.unsubscribe();
    }
  }

  goBack() {
    this.location.back()
  }

  saveOwnerData() {
    this.ownerService.saveOwner(this.owner).subscribe(
      () => {
        this.notifications.clear().success("Zapisano dane Właściciela")
      }
    )
  }
}
