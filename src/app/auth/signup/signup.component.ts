import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { User } from '../../shared/Models/user';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  registerUser : User = new User('','',0,'');
  confirmPassword : string = '';
  passwordEquality: boolean = false;

  constructor(private authService: AuthServiceService, private router: Router, private snackBar : MatSnackBar) {}
  onPasswordType() {
    if (this.registerUser.password === this.confirmPassword) {
      this.passwordEquality = false;
    } else {
      this.passwordEquality = true;
    }
  }
  isValidNumber(mobileNumber:number){
    const mobStr = mobileNumber.toString();
    console.log(mobStr);
    console.log(mobStr.length);
    if(mobStr.length == 10 && /^\d{10}$/.test(mobStr)){
      return true;
    }
    return false;
  }
  onSubmit(){
    if (
      this.registerUser.name === '' ||
      this.registerUser.email === '' ||
      this.registerUser.mobileNumber === 0||
      this.registerUser.password === ''
    ) {
      alert('Enter all fields!');
      return;
    }
    if(this.isValidNumber(this.registerUser.mobileNumber)===false){
      alert('Enter a valid Mobile Number');
      return;
    }
    if (this.registerUser.password != this.confirmPassword) {
      alert('Passwords not matching !');
      return;
    }
    this.authService.getUserByEmail(this.registerUser.email).subscribe({
      next: (response)=>{
        alert();
        this.registerUser.email='';
      },
      error:(error)=>{
        this.signup();
      }
    })
  }
  signup() {
    this.authService.signup(this.registerUser).subscribe(res => {
      this.snackBar.open(res.message,'close',{
        duration :3000,
      });
      this.router.navigate(['/login']);
    }, error => {
      this.snackBar.open(error.message,'close',{
        duration :3000,
      });
      console.error('Signup failed', error);
    });
  }
}
