import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrl: './not-authorized.component.css'
})
export class NotAuthorizedComponent implements OnInit{
    ngOnInit(): void {
      window.sessionStorage.setItem("token","");
      window.sessionStorage.setItem("UserRole","");
      window.sessionStorage.setItem("email","");
    }
}
