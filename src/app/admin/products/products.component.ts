import { Component } from '@angular/core';
import { product } from '../../Models/product';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { category } from '../../Models/category';
import { AdminService } from '../Services/admin.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: any[] = [];
  constructor(public dialog: MatDialog, private adminService: AdminService, private snackBar : MatSnackBar) { }
  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts(): void {
    this.adminService.getAllProduts().subscribe(
      (data: product[]) => {
        this.products = data;
      },
      (error) => {
        console.error(`There was an error loading the users: ${error}`);
      }
    );
  }
  deleteProduct(id : number) :void {
    this.adminService.deleteProduct(id).subscribe(
      () =>{
        this.loadProducts();
        this.snackBar.open('Category Deleted!!!', 'Close', {duration :2000})
      }
    )
  }
  openMiniWindow(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '70vw'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.loadProducts();
      }
    });

  }
}
