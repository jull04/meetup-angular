import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss'
})
export class UserItemComponent {

  @Input() item: User;

  isEditing: boolean = false;

  constructor(public popupService: PopupService) {}

  openPopup() {
    this.popupService.open();
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }
}
