import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  constructor() { }

  ngOnInit(): void {
    // Initialization logic here
  }

  recentOrders = [
    { id: 1, item: 'Product A', quantity: 2, status: 'Delivered' },
    { id: 2, item: 'Product B', quantity: 1, status: 'Pending' },
  ];

  salesData = [ /* Sales graph data */ ];

  lowStockItems = [
    { id: 1, item: 'Product C', stock: 5 },
    { id: 2, item: 'Product D', stock: 3 },
  ];

  stats = {
    totalOrders: 150,
    cancelledOrders: 5,
    pendingOrders: 10,
    totalRevenue: 5000,
    profit: 1200
  };
}
