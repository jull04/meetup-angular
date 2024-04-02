import { Component } from '@angular/core';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-meetup-popup',
  templateUrl: './meetup-popup.component.html',
  styleUrl: './meetup-popup.component.scss'
})
export class MeetupPopupComponent {

  constructor(public popupService: PopupService) {}

  closePopup() {
    this.popupService.close();
  }
}
