import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { Subscription, tap } from "rxjs";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.scss",
})
export class SignupComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  form!: FormGroup;

  constructor(
    private auth: AuthService,
    private _router: Router,
    private _fb: FormBuilder
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
      .register(this.form.value)
      .pipe(
        tap(() => {
          this._router.navigate(["/signin"]);
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
