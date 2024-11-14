import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { Observable, elementAt } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  order: any;
  promoCode: string = '';
  // isValidCoupon: boolean = false;
  isPromoApplied: boolean = false;
  isInvalidCoupon: boolean = false;
  invalidCouponMessage: string = '';
  discount : number = 0;

  constructor(
    private CustomerService: CustomerService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartItems = [];
    this.CustomerService.getCart().subscribe(res => {
      this.order = res;
      console.log(this.order);
      res.cartItems.forEach((element: any) => {
        console.log(element);
        element.processedImg = 'data:image/jpg;base64,' + element.receivedImg;
        this.cartItems.push(element);
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
    return this.order.totalAmount;
  }

  // call an api to calculate discount on getTotalPrice and display on frontend and when the order is placed 
  getDiscount(): number {
    return this.discount;
  }

  getTotalAmount(): number {
    return this.getTotalPrice() - this.getDiscount();
  }

  // Check If the 
  applyPromoCode() {
    this.CustomerService.applyPromoCode(this.promoCode, this.getTotalPrice()).subscribe(
      (response) => {
        if (response.message=="Coupon Applied!") {
          this.discount = response.discount;
          this.isPromoApplied = true;
          this.isInvalidCoupon = false;
          // Handle successful promo code application
        } else{
          this.isPromoApplied = false;
          this.isInvalidCoupon = true;
          this.invalidCouponMessage = response.message || 'Invalid promo code';
        }
      },
      (error) => {
        this.isPromoApplied = false;
        this.isInvalidCoupon = true;
        this.invalidCouponMessage = 'Error applying promo code';
      }
    );
  }
  removePromoCode(){
    this.discount=0;
    this.isPromoApplied = false;
    this.isInvalidCoupon = false;
    this.promoCode = '';
  }

  openCouponDialog() {
    const dialogRef = this.dialog.open(CouponDialogComponent, {
      width: '60%',
      height: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.promoCode = result;
        this.applyPromoCode();
      }
    });
  }

}

@Component({
  selector: 'app-coupon-dialog',

  template: `
    <h1 mat-dialog-title>Available Coupons</h1>
    <div mat-dialog-content>
      <ul>
        <li *ngFor="let coupon of coupons"  (click)="selectCoupon(coupon.couponId)" style="display: block; color: black;">
          <div> {{coupon.couponId}}</div>
          <div> minimum amount : {{coupon.minAmountToAvail}}</div>
          <div *ngIf="coupon.discountType==='PERCENTAGE'"> discount Percentage : {{coupon.discountPercent}} %</div>
          <div *ngIf="coupon.discountType==='VALUE'"> discount : {{coupon.discountValue | currency:'INR'}}</div>
        </li>
      </ul>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="closeDialog()">Cancel</button>
    </div>
  `,
  styles:`
ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      cursor: pointer;
      padding: 8px;
      border: 1px solid #ccc;
      margin-bottom: 4px;
      border-radius: 4px;
    }
    li:hover {
      background-color: #f0f0f0;
    }
  `
})
export class CouponDialogComponent {
  // coupons = ['DISCOUNT10', 'SAVE20'];
  coupons !: any[];

  constructor(public dialogRef: MatDialogRef<CouponDialogComponent>, private CustomerService: CustomerService,) { }

  ngOnInit(): void {
    this.getCoupons();
  }

  getCoupons(){
    this.coupons = [];
      this.CustomerService.getAllActiveCoupons().subscribe(
        result=>{
          this.coupons= result;
        },
        error=>{
          console.error(error);
        }
      )
  }

  selectCoupon(coupon: string) {
    this.dialogRef.close(coupon);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}