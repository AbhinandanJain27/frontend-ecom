import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ProductsComponent } from './products/products.component';
import { OffersComponent } from './offers/offers.component';
import { OrdersComponent } from './orders/orders.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'users', component: UserDetailsComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'coupons', component: OffersComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
