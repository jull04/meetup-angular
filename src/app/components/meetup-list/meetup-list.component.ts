import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-meetup-list',
  templateUrl: './meetup-list.component.html',
  styleUrl: './meetup-list.component.scss',
})
export class MeetupListComponent {

  constructor (public popupService: PopupService) {}

  openPopup() {
    console.log('hi')
    this.popupService.open();
  }

  isAccordionOpen: boolean = false;

  buttonText = 'Пойду';

  isButtonActive = false;

  toggleAccordion() {
    this.isAccordionOpen = !this.isAccordionOpen;
  }

  toggleButtonText() {
    this.buttonText = this.buttonText === 'Пойду' ? 'Не смогу пойти' : 'Пойду';
    this.isButtonActive = !this.isButtonActive;
  }
}
