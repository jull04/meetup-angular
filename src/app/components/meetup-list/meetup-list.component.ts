import { Component } from '@angular/core';
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

  meetups$ = this.meetupService.getMeetups()

  constructor (public popupService: PopupService, public meetupService: MeetupService, public authService: AuthService) {}

  openPopup() {
    this.popupService.open();
  }
}
