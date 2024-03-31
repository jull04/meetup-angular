import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { MeetupListComponent } from './components/meetup-list/meetup-list.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { UsersComponent } from './components/users/users.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'all-meetups',
    component: MeetupListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'my-meetups',
    component: MeetupListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
