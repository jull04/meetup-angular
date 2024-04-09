import { Component } from "@angular/core";
import { User } from "../../models/user";
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    public userService: UserService
  ) {}

  currentUser: User;

  handleLogout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.authService.updateUser();
  }
}
