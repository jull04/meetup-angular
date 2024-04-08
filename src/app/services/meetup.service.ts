import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ExtendedMeetup, Meetup } from '../models/meetup';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class MeetupService {

  baseUrl: string = `${environment.base_url}`;

  meetups$ = new BehaviorSubject<ExtendedMeetup[]>([])

  constructor(private http: HttpClient, authService: AuthService) { }

  getMeetups(): Observable<ExtendedMeetup[]> {
    return this.http.get<ExtendedMeetup[]>(`${this.baseUrl}/meetup`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(
      map(meetups => {
        if (meetups) {
          return meetups.filter(meetup => meetup.owner !== null);
        } else {
          return [];
        }
      }),
      tap(meetups => {
        this.meetups$.next(meetups)
      }),
      
      catchError((error): Observable<never> => {
        console.error(error.error.message);
        throw new Error(error.error.message);
      })
    )
  }

  // getMyMeetups(user: User): Observable<ExtendedMeetup[]> {
  //   return this.http.get<ExtendedMeetup[]>(`${this.baseUrl}/meetup`, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   })
  //   .pipe(
  //     catchError((error): Observable<never> => {
  //       console.error(error);
  //       throw new Error(error.error.message);
  //     })
  //   );
  // }

  createMeetup(meetup: Meetup): Observable<ExtendedMeetup> {
    return this.http.post<ExtendedMeetup>(`${this.baseUrl}/meetup`, meetup, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(
      tap(createdMeetup => {
        this.meetups$.next([createdMeetup, ...this.meetups$.value])
      }),
      catchError((error): Observable<never> => {
        console.error(error.error.message);
        throw new Error(error.error.message);
      })
    )
  }

  subscribeForMeetup(user: User, meetup: ExtendedMeetup): Observable<ExtendedMeetup> {
    return this.http.put<ExtendedMeetup>(`${this.baseUrl}/meetup`, {
      idMeetup: meetup.id,
      idUser: user.id,
    },
    {
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

  unsubscribeFromMeetup( user: User, meetup: ExtendedMeetup): Observable<ExtendedMeetup> {
    return this.http.delete<ExtendedMeetup>(`${this.baseUrl}/meetup`, {
      body: {
        idMeetup: meetup.id,
        idUser: user.id,
    },
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
    })
  }

  editMeetup(id: number, meetup: Meetup): Observable<ExtendedMeetup> {
    return this.http.put<ExtendedMeetup>(`${this.baseUrl}/meetup/${id}`, meetup, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    },
    )
    .pipe(
      catchError((error): Observable<never> => {
        console.error(error.error.message);
        throw new Error(error.error.message);
      })
    )
  }

  deleteMeetup(id: number): Observable<ExtendedMeetup> {
    return this.http.delete<ExtendedMeetup>(`${this.baseUrl}/meetup/${id}`)
    .pipe(
      catchError((error): Observable<never> => {
        console.error(error.error.message);
        throw new Error(error.error.message);
      })
    )
  }
}
