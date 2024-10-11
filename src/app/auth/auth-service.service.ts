import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User } from '../shared/Models/user';
import { Platform } from '@angular/cdk/platform';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private loginUrl = 'http://localhost:8080/user/login';
  private signupUrl = 'http://localhost:8080/user/register';
  private userUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private platform: Platform) { }

  login(credentials: any): Observable<any> {
    return this.http.post(this.loginUrl, credentials);
  }

  signup(user: User): Observable<any> {
    return this.http.post(this.signupUrl, user);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(this.userUrl);
  }

  getUserByEmail(email: string): Observable<any> {
    const url = `${this.userUrl}/${email}`;
    return this.http.get<any>(url);
  }

  isAuthenticated(): boolean {
    if (this.platform.isBrowser) {
      const token = window.sessionStorage.getItem('token');
      return !this.jwtHelper.isTokenExpired(token) || token != null;
    }
    return false;
  }

  getUserRole(): string | null {
    return sessionStorage['UserRole'];
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('UserRole');
    this.router.navigate(['/login']);
  }
}