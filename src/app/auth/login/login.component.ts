import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  credentials = { email: '', password: '' };

  constructor(private authService: AuthServiceService, private router: Router, private snackBar : MatSnackBar) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      response => {
        if (response.message === 'Login successful!') {
          sessionStorage.setItem("token",response.token);
          sessionStorage.setItem("email",response.email);
          if (response.role === 'ADMIN') {
            sessionStorage.setItem("UserRole",response.role);
            this.snackBar.open(response.message,'close',{
              duration :3000,
            });
            this.router.navigate(['/admin']); // Redirect to admin dashboard
          } else {
            sessionStorage.setItem("UserRole",response.role);
            this.snackBar.open(response.message,'close',{
              duration :3000,
            });
            this.router.navigate(['/home']); // Redirect to user home
          }
        } else {
          this.snackBar.open('Invalid Credentials!!','close',{
            duration :3000,
          });
        }
      },
      error => {
        this.snackBar.open('Login Failed Try Again with the correct Credentials','close',{
          duration :3000,
        });

      }
    );
  }
}