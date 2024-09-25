import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../Models/user';
import { category } from '../../Models/category';
import { coupon } from '../../Models/coupon';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = "http://localhost:8080"

  constructor(private http: HttpClient, private router: Router) { }
  
  // User Details 
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user/getAllUsers`);
  }
  deleteUser(email: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/user/${email}`);
  }
  modifyUserStatus(email: string, user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<User>(`${this.baseUrl}/user/modifyAccountStatus/${email}`, user, { headers });
  }


  // Products
  getAllProduts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/product/products`);
  }

  addProduct(productDto: any): Observable<any> {
    return this.http.post<category>(`${this.baseUrl}/product/addProduct`, productDto);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/product/${id}`);
  }


  // Orders
  getAllOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/order/getAllorders`);
  }


  // Categories
  addCategory(category: category): Observable<category> {
    return this.http.post<category>(`${this.baseUrl}/category/addCategory`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/category/${id}`);
  }

  getAllCategories(): Observable<category[]> {
    return this.http.get<category[]>(`${this.baseUrl}/category/Categories`);
  }


  // Coupons
  addCoupon(coupon: coupon): Observable<coupon> {
    return this.http.post<category>(`${this.baseUrl}/coupon/addCoupon`, coupon);
  }

  deleteCoupon(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/coupon/${id}`);
  }

  getAllCoupons(): Observable<coupon[]> {
    return this.http.get<coupon[]>(`${this.baseUrl}/coupon/coupons`);
  }
}
