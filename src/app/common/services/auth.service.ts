import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  auth(login: string, password: string): Observable<object> {
    return this.http.post(`http://localhost:3000/api/v1/auth/login`, {
      login,
      password
    }, httpOptions);
  }

  register(login: string, password: string, firstName: string, city: string, contact: string): Observable<object> {
    return this.http.post(`http://localhost:3000/api/v1/auth/signup`, {
      login,
      password,
      firstName,
      city,
      contact
    }, httpOptions);
  }

  logout(): void {
    localStorage.clear();
  }

  getUser(): string {
    return localStorage.getItem('token');
  }
}
