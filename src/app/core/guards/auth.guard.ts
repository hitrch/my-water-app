import {CanActivateFn, Router} from '@angular/router';
import {AuthStore} from '../store/auth.store';
import {inject} from '@angular/core';

export const AuthGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore)
  const router = inject(Router)

  if(authStore.isAuthenticated()) {
    return true
  }

  return router.parseUrl('/')
}
