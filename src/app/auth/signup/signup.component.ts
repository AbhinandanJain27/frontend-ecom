import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { User } from '../../shared/Models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{

  registerUserForm !: FormGroup;
  passwordEquality : boolean = false;
  mobileNum !: number; 
  existingUser : boolean = false;

  constructor(private fb:FormBuilder, private authService: AuthServiceService, private router: Router, private snackBar : MatSnackBar) {}
  
  ngOnInit(): void {
    this.registerUserForm = this.fb.group({
      name:[null,[Validators.required]],
      email:[null, [Validators.required, Validators.email]],
      mobileNumber : [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword : [null,[Validators.required]]
    })
  } 
  
  onPasswordType() {
    if (this.registerUserForm.get('password')?.value === this.registerUserForm.get('confirmPassword')?.value) {
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
    this.mobileNum = this.registerUserForm.get('mobileNumber')?.value;
    if (this.registerUserForm.valid) {
      if (this.registerUserForm.get('password')?.value !== this.registerUserForm.get('confirmPassword')?.value) {
        alert("Passwords Do not Match");
        return;
      }else{
        this.passwordEquality = true;
      }

      if(!this.isValidNumber(this.mobileNum)){
        alert("Enter A Valid Mobile Number");
        return;
      }
      
      this.authService.getUserByEmail(this.registerUserForm.get('email')?.value).subscribe(res => {
          this.existingUser = true;
        },
        error =>{
          this.existingUser = false;
      });

      if(!this.existingUser){
        this.signup();
      }
    }else{
      alert('Enter all fields!');
      return;
    }
    
  }
  signup() {
    const newUser : User = this.registerUserForm.value;
    this.authService.signup(newUser).subscribe(res => {
      this.snackBar.open("Registration Succesful !!",'close',{
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
