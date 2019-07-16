import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly http: HttpClient) { }

  user: User;

  getOne(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:3000/api/v1/users`, httpOptions);
  }

  deleteOne(): Observable<User[]> {
    return this.http.delete<User[]>(`http://localhost:3000/api/v1/users`, httpOptions);
  }

  updateOne(user: User): Observable<User[]> {
    return this.http.put<User[]>(`http://localhost:3000/api/v1/users`, user, httpOptions);
  }

}
