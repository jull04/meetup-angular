import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, UserRoleUpdateBody } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = `${environment.base_url}`;

  users$ = new BehaviorSubject<User[]>([]);

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
      //положили актуальных юзеров
      tap((users) => {
        this.users$.next(users);
      }),
      catchError((error): Observable<never> => {
        console.error(error.error.message);
        throw new Error(error.error.message);
      })
    )
  }

  editUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/user/${id}`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(
      tap((updatedUser) => {
        const updatedUserIndex = this.users$.value.findIndex(
          (item) => item.id === id
        );
        this.users$.next([
          ...this.users$.value.slice(0, updatedUserIndex),
          updatedUser,
          ...this.users$.value.slice(updatedUserIndex + 1),
        ]);
      }),
      catchError((error): Observable<never> => {
        console.error(error.error.message);
        throw new Error(error.error.message);
      })
    )
  }

  rewriteRoles(userId: number, role: string): Observable<UserRoleUpdateBody> {
    return this.http.post<UserRoleUpdateBody>(`${this.baseUrl}/user/role`, {names: [role.toUpperCase()], userId: userId}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(
      // tap((updatedUser) => {
      //   const updatedUserIndex = this.users$.value.findIndex(
      //     (item) => item.id === id
      //   );
      //   this.users$.next([
      //     ...this.users$.value.slice(0, updatedUserIndex),
      //     updatedUser,
      //     ...this.users$.value.slice(updatedUserIndex + 1),
      //   ]);
      // }),
      catchError((error): Observable<never> => {
        console.error(error.error.message);
        throw new Error(error.error.message);
      })
    )
  }

  deleteUser(id: number): Observable<User[]> {
    return this.http.delete<User[]>(`${this.baseUrl}/user/${id}`)
    .pipe(
      tap(() => {
        const userToDeleteIndex = this.users$.value.findIndex(
          (item) => item.id === id
        );
        this.users$.next([
          ...this.users$.value.slice(0, userToDeleteIndex),
          ...this.users$.value.slice(userToDeleteIndex + 1),
        ]);
      }),
      catchError((error): Observable<never> => {
        console.error(error.error.message);
        throw new Error(error.error.message);
      })
    )
  }
}
