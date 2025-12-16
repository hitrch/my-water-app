import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthUiService {
  private dialog = inject(MatDialog)

  async openLogin(): Promise<void> {
    const { LoginComponent } = await import('../../features/auth/login/login.component')

    this.dialog.open(LoginComponent, {
      width: '400px',
    })
  }

  async openRegister(): Promise<void> {
    const { RegisterComponent } = await import('../../features/auth/register/register.component')

    this.dialog.open(RegisterComponent, {
      width: '600px',
      height: '400px'
    })
  }
}
