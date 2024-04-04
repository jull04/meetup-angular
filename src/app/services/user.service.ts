import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = `${environment.base_url}`;

  constructor(private http: HttpClient, authService: AuthService) { }

  getUsers(token: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    })
  }

  giveRole(token: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    })
  }

}
