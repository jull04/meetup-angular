import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExtendedMeetup, Meetup } from '../../models/meetup';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { MeetupService } from '../../services/meetup.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-meetup-item',
  templateUrl: './meetup-item.component.html',
  styleUrl: './meetup-item.component.scss'
})
export class MeetupItemComponent {

  constructor(private meetupService: MeetupService, private route: ActivatedRoute, public popupService: PopupService, public authService: AuthService, private cdr: ChangeDetectorRef) {}

  openPopup() {
    this.popupService.open(this.currentMeetup);
  }

  deleteMeetup() {
    this.meetupService.deleteMeetup(this.currentMeetup.id).subscribe({
      next: (response) => {
        console.log('Успешно удалено', response);
        this.toggleButtonText();
      },
      error(error) {
        console.error('Ошибка при удалении', error);
      }
  });
  }

  @Input() currentMeetup: ExtendedMeetup;

  onSubscribe() {
    if (this.currentMeetup.users.some(user => this.authService.user$.value?.id === user.id)) {
      this.meetupService.unsubscribeFromMeetup(this.currentMeetup).subscribe({
        next: (response) => {
          console.log('Успешно отподписан на митап:', response);
          this.toggleButtonText();
        },
        error(error) {
          console.error('Ошибка при отподписке на митап:', error);
        }
    });
    } else {
      this.meetupService.subscribeForMeetup(this.currentMeetup).subscribe({
        next:(response) => {
          console.log('Успешно подписан на митап:', response);
          this.toggleButtonText();
        },
        error(error) {
          console.error('Ошибка при подписке на митап:', error);
        }
      });
    }
  }


  isAccordionOpen: boolean = false;

  isEditMode: boolean = false;

  buttonText = '';

  isButtonActive = false;

  private updateButtonText() {
    this.buttonText = (this.currentMeetup.users.some(user => this.authService.user$.value?.id === user.id)) ? 'Не смогу пойти' : 'Пойду';
  }

  toggleAccordion() {
    this.isAccordionOpen = !this.isAccordionOpen;
  }

  toggleButtonText() {
    this.updateButtonText() 
    this.isButtonActive = !this.isButtonActive;
    this.cdr.detectChanges();
  }

  get convertData() {
    const date = new Date(this.currentMeetup.time)
      return date.toLocaleString('ru-RU').replace(',', '')
  }

  ngOnInit(): void {
    this.updateButtonText() 
    // Получаем текущий путь из ActivatedRoute
    const currentPath = this.route.snapshot.url[0]?.path;
    // Проверяем, является ли текущий путь путем моих митапов
    if (currentPath === 'my-meetups') {
      this.isEditMode = true;
    }
  }
}
