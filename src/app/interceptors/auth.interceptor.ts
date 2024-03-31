import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable ()

export class jwtInterceptor implements HttpInterceptor {
  constructor ( private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const updatedRequest = this.setAuthTokenToRequest(request);

    return next.handle(updatedRequest);
  }
    private setAuthTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {
    const {token} = this.authService;
    const isUrlCorrect: boolean = request.url.startsWith(environment.base_url);
    return isUrlCorrect && token ? request.clone({setHeaders: {Authorization: `Bearer ${token}`}}) : request;
  }
}
