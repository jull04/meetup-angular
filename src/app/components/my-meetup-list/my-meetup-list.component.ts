import { Component, OnDestroy } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { MeetupService } from "../../services/meetup.service";
import { PopupService } from "../../services/popup.service";
import { BehaviorSubject, map, Subscription, tap } from "rxjs";
import { ExtendedMeetup } from "../../models/meetup";

@Component({
  selector: "app-my-meetup-list",
  templateUrl: "./my-meetup-list.component.html",
  styleUrl: "./my-meetup-list.component.scss",
})
export class MyMeetupListComponent implements OnDestroy {
  subscription: Subscription;

  meetups$ = this.meetupService.meetups$.pipe(
    map((meetups: ExtendedMeetup[]) =>
      meetups.filter(
        (meetup) => meetup.owner?.id === this.authService.user$.value?.id
      )
    )
  );
  isLoading$ = new BehaviorSubject<boolean>(true);

  constructor(
    public popupService: PopupService,
    public meetupService: MeetupService,
    public authService: AuthService
  ) {}

  search = "";

  handleSearch(event: { search: string }) {
    this.search = event.search;
  }

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
