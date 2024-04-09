import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MeetupService } from '../../services/meetup.service';
import { PopupService } from '../../services/popup.service';
import { BehaviorSubject, map, tap } from 'rxjs';
import { ExtendedMeetup } from '../../models/meetup';

@Component({
  selector: 'app-my-meetup-list',
  templateUrl: './my-meetup-list.component.html',
  styleUrl: './my-meetup-list.component.scss'
})
export class MyMeetupListComponent {

  meetups$ = this.meetupService.meetups$.pipe(map((meetups: ExtendedMeetup[]) => meetups.filter(meetup => meetup.owner?.id === this.authService.user$.value?.id)))
  isLoading$ = new BehaviorSubject<boolean>(true);

  constructor (public popupService: PopupService, public meetupService: MeetupService, public authService: AuthService) {}

  openPopup() {
    this.popupService.open();
  }

  ngOnInit() {
    this.meetupService.getMeetups().pipe(tap(() => {
      this.isLoading$.next(false)
    })).subscribe()
  }
}
