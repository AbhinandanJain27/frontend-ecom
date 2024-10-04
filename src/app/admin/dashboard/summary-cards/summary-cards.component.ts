import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Services/dashboard.service';

@Component({
  selector: 'app-summary-cards',
  templateUrl: './summary-cards.component.html',
  styleUrl: './summary-cards.component.css'
})
export class SummaryCardsComponent implements OnInit {
  totalIncome ?: number;
  monthlyIncome ?: number;
  totalOrders ?: number;
  pendingOrders ?: number;
  cancelledOrders ?: number;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getDashboardSummary().subscribe(data => {
      this.totalIncome = data.totalIncome;
      this.monthlyIncome = data.monthlyIncome;
      this.totalOrders = data.totalOrders;
      this.pendingOrders = data.pendingOrders;
      this.cancelledOrders = data.cancelledOrders;
    });
  }
}
