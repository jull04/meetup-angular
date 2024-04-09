import { Component, Input } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ExtendedMeetup, Meetup } from '../../models/meetup';
import { AuthService } from '../../services/auth.service';
import { MeetupService } from '../../services/meetup.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-meetup-list',
  templateUrl: './meetup-list.component.html',
  styleUrl: './meetup-list.component.scss',
})
export class MeetupListComponent {

  meetups$ = this.meetupService.meetups$
  isLoading$ = new BehaviorSubject<boolean>(true);

  @Input() search: string;

  handleSearch(event: {search: string}) {
    this.search = event.search;
  }

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
