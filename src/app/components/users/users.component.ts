import { Component } from '@angular/core';
import { User } from '../../models/user';
import { PopupService } from '../../services/popup.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent {

  users$ = this.userService.getUsers()

  constructor(public userService: UserService, public popupService: PopupService) {}

  openPopup() {
    this.popupService.open();
  }

  isLoading = false;
  
  ngOnInit() {
    this.isLoading = true;
    this.users$.subscribe(
      () => this.isLoading = false
    );
  }
}
