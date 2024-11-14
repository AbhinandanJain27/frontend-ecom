import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../shared/material/material.module';
import { CartComponent } from './cart/cart.component';
import { CouponDialogComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    CustomerComponent,
    NavbarComponent,
    FooterComponent,
    CartComponent,
    CouponDialogComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ]
})
export class CustomerModule { }
