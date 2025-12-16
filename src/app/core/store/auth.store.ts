import { Injectable, signal, computed } from '@angular/core'
import { User} from '../../shared/models/auth.model'

@Injectable({ providedIn: 'root' })
export class AuthStore {
  // token and user signals
  private token = signal<string | null>(localStorage.getItem('token'))
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

  // computed states
  readonly  user = computed(() => this._user())
  readonly isAuthenticated = computed(() => !!this.token())

  // set token and user together
  setAuth(token: string, user: User) {
    this.token.set(token)
    this._user.set(user)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  // clear auth
  clear() {
    this.token.set(null)
    this._user.set(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}
