import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../Services/admin.service';
import { coupon } from '../../Models/coupon';

@Component({
  selector: 'app-add-coupons',
  templateUrl: './add-coupons.component.html',
  styleUrl: './add-coupons.component.css'
})
export class AddCouponsComponent {

  form!: FormGroup;
  isPercentage = true;
  isExpirationDate = true;

  constructor(public dialogRef: MatDialogRef<AddCouponsComponent>, private fb: FormBuilder, private snackBar: MatSnackBar, private adminService: AdminService) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      couponId: ['',[Validators.required]],
      minAmountToAvail: ['',[Validators.required]],
      discountType: ['PERCENTAGE',[Validators.required]], // Default to 'percentage'
      discountPercent : '',
      discountValue: '', // For percentage or value
      expirationType: ['DATE',[Validators.required]], // Default to 'expirationDate'
      expirationDate:'',
      expirationTotalUsage: '', // For date or number of usages
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
  add(): void {console.log(coupon);
    if (this.form.valid) {
      const newCoupon: coupon = this.form.value;
      console.log(newCoupon);
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
