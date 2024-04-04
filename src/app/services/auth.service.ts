import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, Observable, of, tap, catchError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$ = new BehaviorSubject<User | null>(null)
  baseUrl: string = `${environment.base_url}/auth`;

  constructor(private http: HttpClient, private routes: Router, @Inject(DOCUMENT) private readonly document: Document) {}

  private readonly window = this.document.defaultView!;

  login(user: User): Observable<User> {
    return this.http
      .post<{ token: string }>(`${this.baseUrl}/login`, user)
      .pipe(
        tap((res: { token: string }) => {
          this.window?.localStorage.setItem('user_token', res.token);
          this.updateUser();
        }),
        map((res: { token: string }): User => this.parseJwt(res.token)),
        catchError((error): Observable<never> => {
          console.error(error.error.message);
          throw new Error(error.error.message);
        })
      );
  }

  register(user: User): Observable<any> {
    return this.http
      .post<{ token: string }>(`${this.baseUrl}/registration`, user)
      .pipe(tap(({ token }) => this.window?.localStorage.setItem('user_token', token)),
      catchError((error): Observable<never> => {
        console.error(error.error.message);
        throw new Error(error.error.message);
      })
      );
  }

  parseJwt(token: string): User {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    console.log(JSON.parse(jsonPayload))
    return JSON.parse(jsonPayload);
  }

  public updateUser(): void {
    const token = this.window?.localStorage?.getItem('user_token');
    if (token) {
      const user: User = this.parseJwt(token);
      this.user$.next(user);
    }
  }

  public get token(): string | null {
    if (this.window === null)  {
      return null
    }
    return this.window?.localStorage.getItem('user_token');
  }

  public logout() {
    this.window?.localStorage.removeItem('user_token');
    this.routes.navigate(['/signin']);
    this.user$.next(null);
  }
}
