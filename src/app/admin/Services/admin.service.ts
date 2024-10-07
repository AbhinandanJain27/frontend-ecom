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
  
  // Enum API's For Dynamically getting data from the java backend
  getCatgoryTypes():Observable<string[]>{
    return this.http.get<string[]>(`${this.baseUrl}/enums/categoryTypes`);
  }
  getOrderStatuses() : Observable<string[]>{
    return this.http.get<string[]>(`${this.baseUrl}/enums/orderStatuses`);
  }

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

  getAllProductsByName(name: string) : Observable<any>{
    return this.http.get(`${this.baseUrl}/product/search/${name}`);
  }

  addProduct(productDto: any): Observable<any> {
    return this.http.post<category>(`${this.baseUrl}/product/addProduct`, productDto);
  }

  deleteProduct(id:any): Observable<void> {
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
    return this.http.post<coupon>(`${this.baseUrl}/coupon/addCoupon`, coupon);
  }

  deleteCoupon(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/coupon/${id}`);
  }

  disableCoupon(name : string,coupon:coupon) : Observable<coupon>{
    return this.http.put<coupon>(`${this.baseUrl}/coupon/${name}`,coupon);
  }

  getAllCoupons(): Observable<coupon[]> {
    return this.http.get<coupon[]>(`${this.baseUrl}/coupon/getAllCoupons`);
  }
}
