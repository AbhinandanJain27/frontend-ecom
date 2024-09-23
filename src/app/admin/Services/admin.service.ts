import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../Models/user';
import { category } from '../../Models/category';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = "http://localhost:8080"

  private baseAuthUrl = "http://localhost:8080/user";
  private baseAdminUrl = "http://localhost:8080/admin";

  constructor(private http: HttpClient, private router: Router) { }
  // User Details 
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user/getAllUsers`);
  }
  deleteUser(email: string): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/user/${email}`);
  }
  modifyUserStatus(email: string, user: User) : Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<User>(`${this.baseUrl}/user/modifyAccountStatus/${email}`, user, {headers});
  }

  // Products
  getAllProduts() : Observable<any>{
    return this.http.get(`${this.baseAdminUrl}/getAllProducts`);
  }

  // Orders
  getAllOrders() : Observable<any>{
    return this.http.get(`${this.baseAdminUrl}/getAllorders`);
  }

  // Categories
  addCategory(category : category) : Observable<category>{
    return this.http.post<category>(`${this.baseUrl}/category/category`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/category/${id}`);
}

  getAllCategories() : Observable<category[]>{
    return this.http.get<category[]>(`${this.baseUrl}/category/Categories`);
  }
}
