import { Component } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { PopupService } from "../../services/popup.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrl: "./users.component.scss",
})
export class UsersComponent {
  users$ = this.userService.users$;

  constructor(
    public userService: UserService,
    public popupService: PopupService
  ) {}
  isLoading$ = new BehaviorSubject<boolean>(true);

  ngOnInit() {
    this.userService
      .getUsers()
      .pipe(
        tap(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe();
  }
}
