import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { coupon } from '../../shared/Models/coupon';
import { AdminService } from '../Services/admin.service';
import { AddCouponsComponent } from '../add-coupons/add-coupons.component';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent implements OnInit{
  coupons: coupon[] = [];
  constructor(public dialog: MatDialog, private adminService: AdminService, private snackBar : MatSnackBar) { }
  ngOnInit(): void {
    this.loadCoupons();
  }
  loadCoupons(): void {
    this.adminService.getAllCoupons().subscribe(
      (data: coupon[]) => {
        this.coupons = data;
      },
      (error) => {
        console.error(`There was an error loading the users: ${error}`);
      }
    );
  }
  deleteCoupon(id : string) :void {
    this.adminService.deleteCoupon(id).subscribe(
      () =>{
        this.loadCoupons();
        this.snackBar.open('Coupon Deleted!!!', 'Close', {duration :2000})
      }
    )
  }
  changeCouponStatus(name : string, coupon : coupon) : void{
      this.adminService.disableCoupon(name, coupon).subscribe(
        ()=>{
          this.loadCoupons();
          this.snackBar.open('Coupon Disabled','close',{duration:2000})
        }
      )
  }
  openMiniWindow(): void {
    const dialogRef = this.dialog.open(AddCouponsComponent, {
      width: '70vw'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.loadCoupons();
        this.snackBar.open('Coupon Added','close',{duration:2000})
      }
    });
  }
}
