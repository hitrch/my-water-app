import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

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

  private isMobile(): boolean {
    return window.matchMedia('(max-width: 599px)').matches
  }
}
