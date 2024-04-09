import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Subscription, tap } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrl: "./signin.component.scss",
})
export class SigninComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  form!: FormGroup;

  constructor(
    private auth: AuthService,
    private _fb: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      fio: ["", [Validators.required]],
    });
  }

  onSubmit() {
    // Сохраняем подписку на Observable
    this.subscription = this.auth
      .login(this.form.value)
      .pipe(
        tap(() => {
          this._router.navigate(["/all-meetups"]);
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
