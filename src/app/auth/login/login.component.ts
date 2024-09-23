import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = { email: '', password: '' };

  constructor(private authService: AuthServiceService, private router: Router, private snackBar : MatSnackBar) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      response => {
        if (response.message === 'Login successful!') {
          if (response.role === 'ADMIN') {
            this.snackBar.open(response.message,'close',{
              duration :3000,
            });
            this.router.navigate(['/admin']); // Redirect to admin dashboard
          } else {
            this.snackBar.open(response.message,'close',{
              duration :3000,
            });
            this.router.navigate(['/home']); // Redirect to user home
          }
        } else {
          this.snackBar.open(response.message,'close',{
            duration :3000,
          });
          alert(response.message); // Handle different messages appropriately
        }
      },
      error => {
        this.snackBar.open(error.message,'close',{
          duration :3000,
        });
        console.error('Login failed', error);
        alert(error.error.message || 'Login Failed'); // Error message from the backend
      }
    );
  }
}