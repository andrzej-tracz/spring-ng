import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Policy, POLICY_STATUS_CLOSED, POLICY_STATUS_DRAFT} from '../policy';
import {PolicyService} from '../policy.service';
import {NotificationService} from '../../notification.service';

@Component({
  selector: 'app-policies-list',
  templateUrl: './policies-list.component.html',
  styleUrls: ['./policies-list.component.scss']
})
export class PoliciesListComponent implements OnInit, OnDestroy {


  policies: Policy[] = null;
  policies$: Subscription;

  isLoaded = false;

  constructor(private policyService: PolicyService, private notifications: NotificationService) { }


  ngOnInit() {
    this.loadPolicies();
  }

  ngOnDestroy(): void {
    if (this.policies$) {
      this.policies$.unsubscribe();
    }
  }

  loadPolicies() {
    this.policies$ = this.policyService.getPolicies().subscribe(
      this.onProductsLoadSuccess.bind(this),
      this.onProductsLoadFailed.bind(this)
    );
  }

  deletePolicy(policy: Policy) {

    if (! confirm('Na pewno chcesz to zrobić ?')) {
      return;
    }

    const subscription = this.policyService.deletePolicy(policy).subscribe(
      () => {
        this.policies = this.policies.filter((item: Policy) => {
          return item !== policy;
        });

        this.notifications.clear().success(`Polisa ${policy.name} została usunięta`);

        if (0 === this.policies.length) {
          this.loadPolicies();
        }
      },
      (error) => {

        const response = error.json();

        if (response.message) {
          this.notifications.clear().error(response.message);
        } else {
          this.notifications.clear().error('Błąd podczas usuwania.');
        }

      },
      () => {
        subscription.unsubscribe();
      }
    );
  }

  onProductsLoadSuccess(response) {
    this.policies = response.content.map(data => {
      return new Policy(data);
    });

    this.isLoaded = true;
  }

  onProductsLoadFailed(response) {
    //
  }

  policyStatusClass(policy: Policy) {
    return {
      draft: policy.status === POLICY_STATUS_DRAFT,
      closed: policy.status === POLICY_STATUS_CLOSED,
    }
  }

}
