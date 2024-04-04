import { Component, Input } from '@angular/core';
import { domainToASCII } from 'url';
import { ExtendedMeetup, Meetup } from '../../models/meetup';

@Component({
  selector: 'app-meetup-item',
  templateUrl: './meetup-item.component.html',
  styleUrl: './meetup-item.component.scss'
})
export class MeetupItemComponent {

  @Input() item: ExtendedMeetup;

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

  get convertData() {
    const date = new Date(this.item.time)
     return date.toLocaleString('ru-RU').replace(',', '')
    // return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  }
}
