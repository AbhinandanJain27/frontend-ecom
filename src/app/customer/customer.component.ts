import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { product } from '../shared/Models/product';
import { CustomerService } from './services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  products: product[] = [];

  constructor(private customerService : CustomerService){}

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
}
