import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from '../../Services/dashboard.service';


@Component({
  selector: 'app-sales-graph',
  templateUrl: './sales-graph.component.html',
  styleUrls: ['./sales-graph.component.css']
})
export class SalesGraphComponent implements OnInit {
  chart: any;

  constructor(private dashboardService: DashboardService) {
    // Register Chart.js components globally
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.dashboardService.getSalesData().subscribe(data => {
      this.chart = new Chart('salesChart', {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Sales',
            data: data.sales,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }
}