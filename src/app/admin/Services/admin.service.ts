import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../shared/Models/user';
import { category } from '../../shared/Models/category';
import { coupon } from '../../shared/Models/coupon';
import { AuthServiceService } from '../../auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = "http://localhost:8080"

  constructor(private http:HttpClient, private router:Router, private authService : AuthServiceService) { }

  private createAuthorizationHeader(): HttpHeaders{
     return new HttpHeaders().set(
      'Authorization', `Bearer ${sessionStorage.getItem("token")}`
     )
     .set(
      'content-type','application/json'
     )
  }
  
  // Enum API's For Dynamically getting data from the java backend
  getCatgoryTypes():Observable<string[]>{
    if(! this.authService.isAuthenticated()){
      this.authService.logout();
    }
    return this.http.get<string[]>(`${this.baseUrl}/enums/categoryTypes`,{
      headers : this.createAuthorizationHeader(),
    });
  }
  getOrderStatuses() : Observable<string[]>{
    if(! this.authService.isAuthenticated()){
      this.authService.logout();
    }
    return this.http.get<string[]>(`${this.baseUrl}/enums/orderStatuses`,{
      headers : this.createAuthorizationHeader(),
    });
  }

  // User Details 
  getAllUsers(): Observable<User[]> {
    if(! this.authService.isAuthenticated()){
      this.authService.logout();
    }
    return this.http.get<User[]>(`${this.baseUrl}/user/getAllUsers`,{
      headers : this.createAuthorizationHeader(),
    });
  }
  deleteUser(email: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/user/${email}`,{
      headers : this.createAuthorizationHeader(),
    });
  }
  modifyUserStatus(email: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/user/modifyAccountStatus/${email}`, user,{
      headers : this.createAuthorizationHeader(),
    });
  }


  // Products
  getAllProduts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/product/products`,{
      headers : this.createAuthorizationHeader(),
    });
  }

  getAllProductsByName(name: string) : Observable<any>{
    return this.http.get(`${this.baseUrl}/product/search/${name}`,{
      headers : this.createAuthorizationHeader(),
    });
  }

  addProduct(productDto: any): Observable<any> {
    return this.http.post<category>(`${this.baseUrl}/product/addProduct`, productDto,{
      headers : this.createAuthorizationHeader(),
    });
  }

  deleteProduct(id:any): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/product/${id}`,{
      headers : this.createAuthorizationHeader(),
    });
  }


  // Orders
  getAllOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/order/getAllorders`,{
      headers : this.createAuthorizationHeader(),
    });
  }


  // Categories
  addCategory(category: category): Observable<category> {
    return this.http.post<category>(`${this.baseUrl}/category/addCategory`, category,{
      headers : this.createAuthorizationHeader(),
    });
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/category/${id},`,{
      headers : this.createAuthorizationHeader(),
    });
  }

  getAllCategories(): Observable<category[]> {
    return this.http.get<category[]>(`${this.baseUrl}/category/Categories`,{
      headers : this.createAuthorizationHeader(),
    });
  }


  // Coupons
  addCoupon(coupon: coupon): Observable<coupon> {
    return this.http.post<coupon>(`${this.baseUrl}/coupon/addCoupon`, coupon,{
      headers : this.createAuthorizationHeader(),
    });
  }

  deleteCoupon(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/coupon/${id}`,{
      headers : this.createAuthorizationHeader(),
    });
  }

  disableCoupon(name : string,coupon:coupon) : Observable<coupon>{
    return this.http.put<coupon>(`${this.baseUrl}/coupon/${name}`,coupon,{
      headers : this.createAuthorizationHeader(),
    });
  }

  getAllCoupons(): Observable<coupon[]> {
    return this.http.get<coupon[]>(`${this.baseUrl}/coupon/getAllCoupons`,{
      headers : this.createAuthorizationHeader(),
    });
  }
}
