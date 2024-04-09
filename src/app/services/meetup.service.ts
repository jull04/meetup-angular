import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
} from "rxjs";
import { environment } from "../../environments/environment";
import { ExtendedMeetup, Meetup } from "../models/meetup";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class MeetupService {
  baseUrl: string = `${environment.base_url}`;

  meetups$ = new BehaviorSubject<ExtendedMeetup[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {}

  getMeetups(): Observable<ExtendedMeetup[]> {
    return this.http
      .get<ExtendedMeetup[]>(`${this.baseUrl}/meetup`, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(
        map((meetups) => {
          if (meetups) {
            return meetups.filter((meetup) => meetup.owner !== null);
          } else {
            return [];
          }
        }),
        //положили актуальные митапы
        tap((meetups) => {
          this.meetups$.next(meetups);
        }),
        catchError((error): Observable<never> => {
          console.error(error.error.message);
          throw new Error(error.error.message);
        })
      );
  }

  createMeetup(meetup: Meetup): Observable<ExtendedMeetup> {
    return this.http
      .post<ExtendedMeetup>(`${this.baseUrl}/meetup`, meetup, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(
        tap((createdMeetup) => {
          this.meetups$.next([createdMeetup, ...this.meetups$.value]);
        }),
        catchError((error): Observable<never> => {
          console.error(error.error.message);
          throw new Error(error.error.message);
        })
      );
  }

  subscribeForMeetup(meetup: ExtendedMeetup): Observable<ExtendedMeetup> {
    return this.http
      .put<ExtendedMeetup>(
        `${this.baseUrl}/meetup`,
        {
          idMeetup: meetup.id,
          idUser: this.authService.user$.value?.id,
        },
        {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
          }),
        }
      )
      .pipe(
        tap((updatedMeetup) => {
          const updatedMeetupIndex = this.meetups$.value.findIndex(
            (item) => item.id === meetup.id
          );
          this.meetups$.next([
            ...this.meetups$.value.slice(0, updatedMeetupIndex),
            updatedMeetup,
            ...this.meetups$.value.slice(updatedMeetupIndex + 1),
          ]);
        }),
        catchError((error): Observable<never> => {
          console.error(error.error.message);
          throw new Error(error.error.message);
        })
      );
  }

  unsubscribeFromMeetup(meetup: ExtendedMeetup): Observable<ExtendedMeetup> {
    return this.http.delete<ExtendedMeetup>(`${this.baseUrl}/meetup`, {
      body: {
        idMeetup: meetup.id,
        idUser: this.authService.user$.value?.id,
      },
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    })
    .pipe(
      tap((updatedMeetup) => {
        const updatedMeetupIndex = this.meetups$.value.findIndex(
          (item) => item.id === meetup.id
        );
        this.meetups$.next([
          ...this.meetups$.value.slice(0, updatedMeetupIndex),
          updatedMeetup,
          ...this.meetups$.value.slice(updatedMeetupIndex + 1),
        ]);
      }),
      catchError((error): Observable<never> => {
        console.error(error.error.message);
        throw new Error(error.error.message);
      })
    )
  }

  editMeetup(currentMeetUp: ExtendedMeetup, updatedMeetup: Meetup): Observable<ExtendedMeetup> {
    return this.http
      .put<ExtendedMeetup>(`${this.baseUrl}/meetup/${currentMeetUp.id}`, updatedMeetup, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(
        map(updatedMeetup => {
          // Добавляем или обновляем поле owners в объекте updatedMeetup
          return {...updatedMeetup, owner: currentMeetUp.owner}
        }),
        tap((updatedMeetup) => {
          console.log(updatedMeetup)
          const updatedMeetupIndex = this.meetups$.value.findIndex(
            (item) => item.id === currentMeetUp.id
          );
          this.meetups$.next([
            ...this.meetups$.value.slice(0, updatedMeetupIndex),
            updatedMeetup,
            ...this.meetups$.value.slice(updatedMeetupIndex + 1),
          ]);
        }),
        catchError((error): Observable<never> => {
          console.error(error.error.message);
          throw new Error(error.error.message);
        })
      );
  }

  deleteMeetup(id: number): Observable<ExtendedMeetup> {
    return this.http
      .delete<ExtendedMeetup>(`${this.baseUrl}/meetup/${id}`)
      .pipe(
        tap(() => {
          const meetupToDeleteIndex = this.meetups$.value.findIndex(
            (item) => item.id === id
          );
          this.meetups$.next([
            ...this.meetups$.value.slice(0, meetupToDeleteIndex),
            ...this.meetups$.value.slice(meetupToDeleteIndex + 1),
          ]);
        }),
        catchError((error): Observable<never> => {
          console.error(error.error.message);
          throw new Error(error.error.message);
        })
      );
  }
}
