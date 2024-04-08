import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterPipe } from './pipes/filter.pipe';
import { AboutComponent } from './components/about/about.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { jwtInterceptor } from './interceptors/auth.interceptor';
import { MeetupListComponent } from './components/meetup-list/meetup-list.component';
import { UsersComponent } from './components/users/users.component';
import { CommonModule } from '@angular/common';
import { MeetupPopupComponent } from './components/meetup-popup/meetup-popup.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MeetupItemComponent } from './components/meetup-item/meetup-item.component';
import { MeetupSearchComponent } from './components/meetup-search/meetup-search.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { DeletePopupComponent } from './components/delete-popup/delete-popup.component';
import { MyMeetupListComponent } from './components/my-meetup-list/my-meetup-list.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    AboutComponent,
    SignupComponent,
    SigninComponent,
    MeetupListComponent,
    UsersComponent,
    MeetupPopupComponent,
    LoaderComponent,
    MeetupItemComponent,
    MeetupSearchComponent,
    UserItemComponent,
    DeletePopupComponent,
    MyMeetupListComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    provideHttpClient(withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: jwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
