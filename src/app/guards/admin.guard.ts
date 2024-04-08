import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { map } from 'rxjs';
import { UserService } from '../services/user.service';

export const adminGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.isCurrentUserAdmin$().pipe(map(isAdmin => {
    if (!isAdmin) {
        router.navigate(['/all-meetups']);
        return false;
      }
      return true;
  }))
};