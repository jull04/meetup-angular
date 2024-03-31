import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchComponent } from './components/search/search.component';
import { AboutComponent } from './components/about/about.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { jwtInterceptor } from './interceptors/auth.interceptor';
import { MeetupListComponent } from './components/meetup-list/meetup-list.component';
import { UsersComponent } from './components/users/users.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoFormComponent,
    FilterPipe,
    SearchComponent,
    AboutComponent,
    SignupComponent,
    SigninComponent,
    MeetupListComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: jwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
