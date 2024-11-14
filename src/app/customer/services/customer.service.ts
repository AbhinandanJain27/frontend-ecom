import { Injectable } from '@angular/core';
import { AuthServiceService } from '../../auth/auth-service.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { coupon } from '../../shared/Models/coupon';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = "http://localhost:8080"
  constructor(private http: HttpClient, private router: Router, private authService: AuthServiceService) { }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem("token")}`)
      .set('content-type', 'application/json')
  }

  getAllProduts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/product/products`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addToCart(productId : number) : Observable<any>{
    const itemDto = {
      productId : productId,
      email : sessionStorage.getItem("email"), 
    }
    return this.http.post(`${this.baseUrl}/cart/addToCart`,itemDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getCart() : Observable<any>{
    return this.http.get(`${this.baseUrl}/cart`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllActiveCoupons(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/coupon/getAllActiveCoupons`,{
      headers : this.createAuthorizationHeader(),
    });
  }

  applyPromoCode(promoCode:string, amount : number): Observable<any> {
    const applyCouponDto = {
        coupon : promoCode,
        amount : amount
    };
    return this.http.post<any>(`${this.baseUrl}/cart/applyCoupon`, applyCouponDto ,{
      headers : this.createAuthorizationHeader(),
    });
  } 

}
