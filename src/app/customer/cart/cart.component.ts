import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../shared/Models/cart-item';
import { CustomerService } from '../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cartItems: any[] = [];
  order : any;

  constructor(
    private CustomerService : CustomerService,
    private snackBar : MatSnackBar,
    private fb : FormBuilder,
    private dialog : MatDialog
  ){}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.cartItems = [];
    this.CustomerService.getCart().subscribe(res =>{
      this.order = res;
      console.log(this.order);
      res.cartItems.forEach((element:any ) =>{
        console.log(element);
        element.processedImg = 'data:image/jpg;base64,' + element.receivedImg;
        this.cartItems.push( element);
      });
    })
  }

  removeItem(itemId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
  }

  updateItemQuantity(itemId: number, quantity: number) {
    const item = this.cartItems.find(cartItem => cartItem.id === itemId);
    if (item) {
      item.quantity = quantity;
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
