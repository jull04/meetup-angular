import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private auth: AuthService,
    private _router: Router,
    private _fb: UntypedFormBuilder
    ) {}
  ngOnInit(): void {
    this.form = this._fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      fio: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.auth
      .register(this.form.value)
      .pipe(
        tap(() => {
          this._router.navigate(['/signin'])
        })
      )
      .subscribe()
  }
}
