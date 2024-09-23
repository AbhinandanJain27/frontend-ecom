import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  constructor(public dialogRef: MatDialogRef<AddProductComponent>){}

  close() : void {
    this.dialogRef.close();
  }
}
