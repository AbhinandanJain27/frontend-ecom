import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { category } from '../../shared/Models/category';
import { AdminService } from '../Services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  Categories: category[] = [];
  selectedFile!: File | null;
  imagePreview!: String | ArrayBuffer | null;

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      categoryId: [null, [Validators.required]],
      productName: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });

    this.getAllCategories();
  }

  getAllCategories() {
    this.adminService.getAllCategories().subscribe(
      res => {
        this.Categories = res;
      },
      error => {
        console.error('Error fetching categories');
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }

  add(): void {
    if (this.productForm.valid) {
      const formData: FormData = new FormData();

      formData.append('img', this.selectedFile!);
      formData.append('categoryId', this.productForm.get('categoryId')?.value ?? '');
      formData.append('productName', this.productForm.get('productName')?.value ?? '');
      formData.append('price', this.productForm.get('price')?.value ?? '');
      formData.append('description', this.productForm.get('description')?.value ?? '');

      this.adminService.addProduct(formData).subscribe(
        res => {
          if (res.categoryId != null) {
            this.dialogRef.close(true);
          } else {
            console.log('Something went wrong: ', res);
          }
        },
        error => {
          console.error('Error adding product', error);
          this.snackBar.open('Error adding product', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    if (!this.selectedFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}