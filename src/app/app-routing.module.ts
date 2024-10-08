import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin-guard';
import { CustomerGuard } from './auth/customer-guard';
import { NotAuthorizedComponent } from './auth/not-authorized/not-authorized.component';

// ,canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } // add this in path of admin for login confirmation
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'unauthorized', component: NotAuthorizedComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate: [AuthGuard, AdminGuard]},
  { path: 'home', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),canActivate: [AuthGuard, CustomerGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
