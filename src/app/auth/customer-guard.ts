import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
    providedIn: 'root'
  })
  export class CustomerGuard implements CanActivate {
    
    constructor(private authService: AuthServiceService, private router: Router) {}
  
    canActivate(): boolean {
      if (this.authService.isAuthenticated() && this.authService.getUserRole() !== 'CUSTOMER') {
        this.router.navigate(['/unauthorized']);
        return false;
      }
  
      return true;
    }
  }