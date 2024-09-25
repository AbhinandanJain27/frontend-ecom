import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { category } from '../../Models/category';
import { AdminService } from '../Services/admin.service';
import { coupon } from '../../Models/coupon';

@Component({
  selector: 'app-add-coupons',
  templateUrl: './add-coupons.component.html',
  styleUrl: './add-coupons.component.css'
})
export class AddCouponsComponent {

  couponForm!: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddCouponsComponent>, private fb: FormBuilder, private snackBar: MatSnackBar, private adminService: AdminService) { }
  ngOnInit(): void {
    this.couponForm = this.fb.group({
      name: [null, [Validators.required]],
      discount: [null, [Validators.required]],
    })
  }
  close(): void {
    this.dialogRef.close();
  }
  add(): void {
    if(this.couponForm.valid){  
      const newCoupon : coupon = this.couponForm.value;
      this.adminService.addCoupon(newCoupon).subscribe(
        (response) =>{
          console.log('coupon added Successfully: ',response);
          this.dialogRef.close(true);  
        },
        (error)=>{
           console.error('Error Adding Coupons:  ', error)
        }
      )
    }
  }
}
