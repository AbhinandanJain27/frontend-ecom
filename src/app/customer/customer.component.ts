import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { product } from '../shared/Models/product';
import { CustomerService } from './services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  products: product[] = [];

  constructor(private customerService : CustomerService, private snackbar : MatSnackBar){}

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts(): void {
    this.products = [];
    this.customerService.getAllProduts().subscribe(res => {
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

  addToCart(id: number){
    this.customerService.addToCart(id).subscribe( res=>{
      console.log(res.message);
      this.snackbar.open(res.message,'Close', {
        duration : 3000,
      })
    },
    err =>{
      console.log(err.message);
      this.snackbar.open(err.message,'Close', {
        duration : 3000,
      })
    }
  )}
}
