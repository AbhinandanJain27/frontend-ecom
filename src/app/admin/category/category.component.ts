import { Component, OnInit } from '@angular/core';
import { category } from '../../shared/Models/category';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { AdminService } from '../Services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories: category[] = [];
  constructor(public dialog: MatDialog, private adminService: AdminService, private snackBar : MatSnackBar) { }
  ngOnInit(): void {
    this.loadCategories();
  }
  loadCategories(): void {
    this.adminService.getAllCategories().subscribe(
      (data: category[]) => {
        this.categories = data;
      },
      (error) => {
        console.error(`There was an error loading the users: ${error}`);
      }
    );
  }
  deleteCategory(id : number) :void {
    this.adminService.deleteCategory(id).subscribe(
      () =>{
        this.loadCategories();
        this.snackBar.open('Category Deleted!!!', 'Close', {duration :2000})
      }
    )
  }
  openMiniWindow(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '70vw'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.loadCategories();
        this.snackBar.open('Category Added','close',{duration:2000})
      }
    });

  }
}
