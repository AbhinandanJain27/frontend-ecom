import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-coupons',
  templateUrl: './add-coupons.component.html',
  styleUrl: './add-coupons.component.css'
})
export class AddCouponsComponent {
  constructor(public dialogRef: MatDialogRef<AddCouponsComponent>){}

  close() : void {
    this.dialogRef.close();
  }
}
