import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthStore } from './auth.store';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  if (authStore.user()) return true;
  router.navigateByUrl('/login');
  return false;
};
