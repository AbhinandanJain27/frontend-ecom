import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { category } from '../../Models/category';
import { AdminService } from '../Services/admin.service';
import { product } from '../../Models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'] // Changed `styleUrl` to `styleUrls`
})
export class AddProductComponent {
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
      name: [null, [Validators.required]],
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
        console.error("Error fetching categories");
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }

  add(): void {
    if (this.productForm.valid) {
      const formData: FormData = new FormData();

      // Use optional chaining to prevent errors
      formData.append('img', this.selectedFile!);
      formData.append('categoryId', this.productForm.get('categoryId')?.value ?? '');
      formData.append('name', this.productForm.get('name')?.value ?? '');
      formData.append('price', this.productForm.get('price')?.value ?? '');
      formData.append('description', this.productForm.get('description')?.value ?? '');

      this.adminService.addProduct(formData).subscribe(
        res => {
          if (res.id != null) {
            console.log('Product added: ', res);
            this.dialogRef.close(true);
          } else {
            console.log('Something Went Wrong: ', res);
          }
        },
        error => {
          console.error('Error adding product', error);
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