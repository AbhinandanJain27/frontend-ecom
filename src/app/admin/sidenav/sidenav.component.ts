import { Component } from '@angular/core';
import { AuthServiceService } from '../../auth/auth-service.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  constructor(private authService : AuthServiceService){}
  logout(){
    this.authService.logout();
  }
}
