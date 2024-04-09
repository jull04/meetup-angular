import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { tap } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrl: "./signin.component.scss",
})
export class SigninComponent implements OnInit {
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
    this.auth
      .login(this.form.value)
      .pipe(
        tap(() => {
          this._router.navigate(["/all-meetups"]);
        })
      )
      .subscribe();
  }
}
