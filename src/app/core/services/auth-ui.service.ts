import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthUiService {
  private dialog = inject(MatDialog)

  async openLogin(): Promise<void> {
    const { LoginComponent } = await import('../../features/auth/login/login.component')
    const isMobile = this.isMobile()

    this.dialog.open(LoginComponent, {
      width: isMobile ? '95vw' : '400px',
      maxWidth: isMobile ? '95vw' : '400vw',
      maxHeight: '90vh',
      autoFocus: false,
    })
  }

  async openRegister(): Promise<void> {
    const { RegisterComponent } = await import('../../features/auth/register/register.component')
    const isMobile = this.isMobile()

    this.dialog.open(RegisterComponent, {
      width: isMobile ? '95vw' : '440px',
      maxWidth: isMobile ? '95vw' : '440vw',
      maxHeight: '90vh',
      autoFocus: false,
    })
  }

  mapAuthErrorToMessage(
    err: HttpErrorResponse,
    context: 'register' | 'login'
  ): string {
    if (err.status === 0) return 'Network error. Check your connection and try again.'

    if (context === 'register') {
      if (err.status === 409) return 'An account with this email already exists.'
      return 'Registration failed. Please try again.'
    }

    // context === 'login'
    if (err.status === 401) return 'Invalid email or password.'
    return 'Login failed. Please try again.'
  }

  private isMobile(): boolean {
    return window.matchMedia('(max-width: 599px)').matches
  }
}
