import { Component, OnInit } from '@angular/core';
import { product } from '../../shared/Models/product';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../Services/admin.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products: product[] = [];
  searchProductForm!: FormGroup;

  constructor(public dialog: MatDialog, private adminService: AdminService, private snackBar: MatSnackBar, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.searchProductForm = this.fb.group({
      title: ['', Validators.required],
    });

    this.loadProducts();

  }
  loadProducts(): void {
    this.products = [];
    this.adminService.getAllProduts().subscribe(res => {
      res.forEach((element: product) => {
        element.processedImage = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
    },
      error => {
        console.error(error);
      }
    );
  }

  searchProduct() {
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this.adminService.getAllProductsByName(title).subscribe(res => {
      res.forEach((element: product) => {
        element.processedImage = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
    },
      error => {
        console.error(error);
      }
    );
  }

  deleteProduct(id: any): void {
    this.adminService.deleteProduct(id).subscribe(
      () => {
        this.loadProducts();
        this.snackBar.open('Product Deleted!!!', 'Close', { duration: 2000 })
      }
    )
  }
  openMiniWindow(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '70vw'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.snackBar.open('Product added successfully!', 'Close', {
          duration: 3000,
        });
        this.loadProducts();
      }
    });
  }

  updateMiniWindow(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '70vw'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.snackBar.open('Product Updated successfully!', 'Close', {
          duration: 3000,
        });
        this.loadProducts();
      }
    });
  }
}

