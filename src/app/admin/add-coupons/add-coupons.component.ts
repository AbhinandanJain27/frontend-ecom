import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../Services/admin.service';
import { coupon } from '../../shared/Models/coupon';

@Component({
  selector: 'app-add-coupons',
  templateUrl: './add-coupons.component.html',
  styleUrl: './add-coupons.component.css'
})
export class AddCouponsComponent implements OnInit{

  form!: FormGroup;
  isPercentage = true;
  isExpirationDate = true;

  constructor(public dialogRef: MatDialogRef<AddCouponsComponent>, private fb: FormBuilder, private snackBar: MatSnackBar, private adminService: AdminService) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      couponId: [null,[Validators.required]],
      minAmountToAvail: [null,[Validators.required]],
      discountType: ['PERCENTAGE',[Validators.required]], // Default to 'percentage'
      discountPercent : null,
      discountValue: null, // For percentage or value
      expirationType: ['DATE',[Validators.required]], // Default to 'expirationDate'
      expirationDate:null,
      expirationTotalUsage: null, // For date or number of usages
    });

      // Set initial states based on default values
      this.handleDiscountTypeChange(this.form.get('discountType')?.value);
      this.handleExpirationTypeChange(this.form.get('expirationType')?.value);

      // Subscribe to value changes
      this.form.get('discountType')?.valueChanges.subscribe(value => this.handleDiscountTypeChange(value));
      this.form.get('expirationType')?.valueChanges.subscribe(value => this.handleExpirationTypeChange(value));
  }
  close(): void {
    this.dialogRef.close();
  }
  add(): void {
    if (this.form.valid) {
      const newCoupon: coupon = this.form.value;
      this.adminService.addCoupon(newCoupon).subscribe(
        (response) => {
          console.log('coupon added Successfully: ', response);
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error Adding Coupons:  ', error)
        }
      )
    }
  }

  handleDiscountTypeChange(value: string): void {
    this.isPercentage = value === 'PERCENTAGE';
  }

  handleExpirationTypeChange(value: string): void {
    this.isExpirationDate = value === 'DATE';
  }
}
