import { Component, Input } from '@angular/core';
import { ExtendedMeetup } from '../../models/meetup';
import { MeetupService } from '../../services/meetup.service';

@Component({
  selector: 'app-meetup-item',
  templateUrl: './meetup-item.component.html',
  styleUrl: './meetup-item.component.scss'
})
export class MeetupItemComponent {

  constructor(private meetupService: MeetupService) {}

  // onSaveButtonClick(user: User, meetup: ExtendedMeetup) {
  //   if (/* пользователь подписан на митап */) {
  //     this.meetupService.unsubscribeFromMeetup(user, meetup).subscribe(
  //       (response) => {
  //         // Обработка успешной отписки
  //       },
  //       (error) => {
  //         // Обработка ошибки отписки
  //       }
  //     );
  //   } else {
  //     this.meetupService.subscribeForMeetup(user, meetup).subscribe(
  //       (response) => {
  //         // Обработка успешной подписки
  //       },
  //       (error) => {
  //         // Обработка ошибки подписки
  //       }
  //     );
  //   }
  // }

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
