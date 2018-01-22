import {Component, OnDestroy, OnInit} from '@angular/core';
import {Chart} from 'ng2-chartjs2';
import {DashboardService} from './dashboard.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  isLoaded = false;

  stats = {
    customers: 0,
    products: 0,
    policies: 0
  };

  labels: string[] = ['Klienci', 'Produkty', 'Polisy'];

  data: Chart.Dataset[] = [
    {
      label: '# of Votes',
      data: [],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderWidth: 1
    }
  ];

  lineOptions: Chart.Options = {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'March', 'April', 'May', 'Jun'],
      datasets: [
        {
          label: 'Historia ostatnich Polis',
          data: [30, 20, 10, 45, 66, 55, 44],
        }
      ]
    },
    options: {
      zoom: {
        enabled: true
      }
    }
  };

  private data$: Subscription;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.data$ = this.dashboardService.getDashboardData().subscribe(
      response => {
        this.stats.customers = response.customers;
        this.stats.products = response.products;
        this.stats.policies = response.policies;

        this.data[0].data = this.setPieData();
        this.setLineChartData(response.history.reverse());
      },
      error => {

      },
      () => {
        this.isLoaded = true;
      }
    )
  }

  ngOnDestroy(): void {
    if (this.data$) {
      this.data$.unsubscribe();
    }
  }

  setPieData() {
    return [this.stats.customers, this.stats.products, this.stats.policies];
  }

  setLineChartData(data) {

    this.lineOptions.data.labels = data.map((item: any) => {
      return item.display;
    });

    this.lineOptions.data.datasets[0].data = data.map((item: any) => {
      return item.value;
    });
  }
}
