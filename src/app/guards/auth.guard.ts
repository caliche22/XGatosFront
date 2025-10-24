import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  (auth as any).store?.restore?.();
  return auth.isLoggedIn()
    ? true
    : router.createUrlTree(['/login'], { queryParams: { redirectTo: state.url } });
};
