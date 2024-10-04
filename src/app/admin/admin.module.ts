import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { OffersComponent } from './offers/offers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddCouponsComponent } from './add-coupons/add-coupons.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SummaryCardsComponent } from './dashboard/summary-cards/summary-cards.component';
import { SalesGraphComponent } from './dashboard/sales-graph/sales-graph.component';



@NgModule({
  declarations: [
    AdminComponent,
    UserDetailsComponent,
    HeaderComponent,
    SidenavComponent,
    ProductsComponent,
    OrdersComponent,
    OffersComponent,
    DashboardComponent,
    CategoryComponent,
    AddCategoryComponent,
    AddProductComponent,
    AddCouponsComponent,
    SummaryCardsComponent,
    SalesGraphComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
