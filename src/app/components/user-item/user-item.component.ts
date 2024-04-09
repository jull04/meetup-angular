import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { PopupService } from '../../services/popup.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss'
})
export class UserItemComponent {

  @Input() item: User;

  isEditing: boolean = false;

  constructor(public popupService: PopupService, public userService: UserService) {}

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  deleteMeetup() {
    this.userService.deleteUser(this.item.id).subscribe({
      next: (response) => {
        console.log("Успешно удалено", response);
      },
      error(error) {
        console.error("Ошибка при удалении", error);
      },
    });
  }
}
