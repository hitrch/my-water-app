import { Injectable, signal, computed } from '@angular/core'
import { AuthUser } from '../../shared/models/auth.model'

@Injectable({ providedIn: 'root' })
export class AuthStore {
  // token and user signals
  private token = signal<string | null>(localStorage.getItem('token'))
  private user = signal<{ email: string } | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  )

  // computed states
  readonly isAuthenticated = computed(() => !!this.token())
  readonly userEmail = computed(() => {
    console.log(this.user())
    return this.user()?.email || null
  })

  // set token and user together
  setAuth(token: string, user: { email: string }) {
    this.token.set(token)
    this.user.set(user)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  // clear auth
  clear() {
    this.token.set(null)
    this.user.set(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}
