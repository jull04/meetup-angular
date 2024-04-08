import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = `${environment.base_url}`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  isCurrentUserAdmin$(): Observable<boolean> {
    return this.authService.user$.pipe(map(user => user ? user.roles.some(role => role.name === 'ADMIN') : false))
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(
      catchError((error): Observable<never> => {
        console.error(error.error.message);
        throw new Error(error.error.message);
      })
    )
  }

  editUser(id: number, user: User): Observable<User[]> {
    return this.http.put<User[]>(`${this.baseUrl}/user/${id}`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(
      catchError((error): Observable<never> => {
        console.error(error.error.message);
        throw new Error(error.error.message);
      })
    )
  }

  deleteUser(id: number): Observable<User[]> {
    return this.http.delete<User[]>(`${this.baseUrl}/user/${id}`)
    .pipe(
      catchError((error): Observable<never> => {
        console.error(error.error.message);
        throw new Error(error.error.message);
      })
    )
  }
}
