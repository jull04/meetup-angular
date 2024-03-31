import { Component } from '@angular/core';

@Component({
  selector: 'app-meetup-list',
  templateUrl: './meetup-list.component.html',
  styleUrl: './meetup-list.component.scss'
})
export class MeetupListComponent {

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
