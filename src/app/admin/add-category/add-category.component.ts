import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../Services/admin.service';
import { category } from '../../shared/Models/category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit{
  categoryTypes : string[] = [];
  categoryForm!: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddCategoryComponent>, private fb: FormBuilder, private snackBar: MatSnackBar, private adminService: AdminService) { }
  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      type: ['', Validators.required],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.loadCategoryTypes();
  }
  loadCategoryTypes(){
    this.adminService.getCatgoryTypes().subscribe(
      data => {
        this.categoryTypes = data;
      },
      error =>{
        console.error("Error Fetching Category Types");
      }
    )
  }
  close(): void {
    this.dialogRef.close();
  }
  add(): void {
    if(this.categoryForm.valid){  
      const newCategory : category = this.categoryForm.value;
      this.adminService.addCategory(newCategory).subscribe(
        (response) =>{
          console.log('category added: ',response);
          this.dialogRef.close(true);  
        },
        (error)=>{
           console.error('Error Adding Category: ', error)
        }
      )
    }
  }
}
