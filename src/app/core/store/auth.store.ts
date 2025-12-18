import {Injectable, signal, computed, inject} from '@angular/core'
import { User} from '../../shared/models/auth.model'
import {finalize, switchMap, tap} from 'rxjs';
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private _token = signal<string | null>(localStorage.getItem('token'))
  private _user = signal<User | null>(
    (() => {
      const saved = localStorage.getItem('user')
      try {
        return saved ? JSON.parse(saved) : null
      } catch {
        return null
      }
    })()
  )
  private _authService = inject(AuthService)
  readonly isLoading = signal(false)

  readonly  user = computed(() => this._user())
  readonly isAuthenticated = computed(() => !!this._token())


  login(email: string, password: string) {
    this.isLoading.set(true)
    return this._authService.login(email, password).pipe(
      tap(res => this.setAuth(res.accessToken, res.user)),
      finalize(() => this.isLoading.set(false))
    )
  }

  register(email: string, password: string) {
    this.isLoading.set(true)
    return this._authService.register(email, password).pipe(
      switchMap(() => this.login(email, password)),
      finalize(() => this.isLoading.set(false))
    )
  }

  setAuth(token: string, user: User) {
    this._token.set(token)
    this._user.set(user)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  // clear auth
  clear() {
    this._token.set(null)
    this._user.set(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}
