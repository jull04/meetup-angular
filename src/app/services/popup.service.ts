import { Injectable } from '@angular/core';
import { ExtendedMeetup } from '../models/meetup';

@Injectable({
  providedIn: 'root'
})

export class PopupService {

  private isOpen = false;

  public meetupToEdit: ExtendedMeetup | null = null;

  open(meetupToEdit?: ExtendedMeetup) {
    this.isOpen = true;
    if(meetupToEdit)
    this.meetupToEdit = meetupToEdit;
  }

  close() {
    this.isOpen = false;
    this.meetupToEdit = null;
  }

  isOpened() {
    return this.isOpen;
  }
}
