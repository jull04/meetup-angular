import { Component, Input, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subscription, tap } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { MeetupService } from "../../services/meetup.service";
import { PopupService } from "../../services/popup.service";

@Component({
  selector: "app-meetup-list",
  templateUrl: "./meetup-list.component.html",
  styleUrl: "./meetup-list.component.scss",
})
export class MeetupListComponent implements OnDestroy {
  meetups$ = this.meetupService.meetups$;
  isLoading$ = new BehaviorSubject<boolean>(true);
  subscription: Subscription;
  search = "";

  handleSearch(event: { search: string }) {
    this.search = event.search;
  }

  constructor(
    public popupService: PopupService,
    public meetupService: MeetupService,
    public authService: AuthService
  ) {}

  openPopup() {
    this.popupService.open();
  }

  ngOnInit() {
    // Сохраняем подписку на Observable
    this.subscription = this.meetupService
      .getMeetups()
      .pipe(
        tap(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    // Отписываемся от подписки при уничтожении компонента
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
