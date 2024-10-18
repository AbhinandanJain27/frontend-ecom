import { Injectable } from '@angular/core';
import { AuthServiceService } from '../../auth/auth-service.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

}
