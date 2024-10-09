import { Component, OnInit } from '@angular/core';  
import { User } from '../../shared/Models/user';
import { AdminService } from '../Services/admin.service';
import { AuthServiceService } from '../../auth/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'] 
})
export class UserDetailsComponent implements OnInit {
  users: User[] = [];
  
  constructor(
    private adminService: AdminService, 
    private authService: AuthServiceService, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error(`There was an error loading the users: ${error}`);
      }
    );
  }

  deleteUser(email: string): void {
    this.adminService.deleteUser(email).subscribe(
      () => {
        this.loadUsers(); // Reload users after deletion
        this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  updateAccountStatus(user: User): void {
    const updatedStatus = user.accountStatus === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';

    // Create a new user object with updated status
    const updatedUser: User = { ...user, accountStatus: updatedStatus };
    console.log(user.email)
    this.adminService.modifyUserStatus(user.email, updatedUser).subscribe(
      () => {
        this.loadUsers(); // Reload users after update
        this.snackBar.open('User status updated successfully', 'Close', { duration: 3000 });
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
}