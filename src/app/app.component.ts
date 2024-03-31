import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TodoService } from './services/todo.service';
import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit {

  // user!: User | null;

  constructor(public authService: AuthService){}

  handleLogout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.authService.updateUser();
  }
}
