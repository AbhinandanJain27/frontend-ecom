import { Component, OnInit } from '@angular/core';
import { order } from '../../shared/Models/order';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orders: order[] = [];
  orderStatuses : string[] = [];

  constructor(private adminService : AdminService){}

  ngOnInit(): void {
    this.fetchOrderStatus();
    this.fetchOrders();
  }

  fetchOrderStatus() : void{
    this.adminService.getOrderStatuses().subscribe(
      (data: string[]) => {
        this.orderStatuses = data;
      },
      error =>{
        console.error('Failed to fetch order status', error);
      }
    )
  }

  fetchOrders(): void {
    this.adminService.getAllOrders().subscribe(
      (data: order[]) => {
        this.orders = data;
      },
      error => {
        console.error('Failed to fetch orders', error);
      }
    );
  }
}
