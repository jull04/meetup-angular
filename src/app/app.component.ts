import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TodoService } from './services/todo.service';
import { User } from './models/user';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit {

  constructor(public authService: AuthService, public userService: UserService){}

  currentUser: User; 

  handleLogout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.authService.updateUser();
  }
}
