import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { product } from '../../shared/Models/product';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  products: product[] = [];

  searchProductForm !: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchProductForm = this.fb.group({
      title: ['', [Validators.required]]
    });
  }
  searchProduct() {
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    // this.adminService.getAllProductsByName(title).subscribe(res => {
    //   res.forEach((element: product) => {
    //     element.processedImage = 'data:image/jpeg;base64,' + element.byteImg;
    //     this.products.push(element);
    //   });
    // },
    //   error => {
    //     console.error(error);
    //   }
    // );
  }
}
