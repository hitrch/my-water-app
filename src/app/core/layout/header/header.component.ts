import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../../../features/auth/login/login.component';
import {RegisterComponent} from '../../../features/auth/register/register.component';
import {AuthStore} from '../../store/auth.store';

@Component({
  selector: 'app-header',
  imports: [
    MatButton
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  dialog = inject(MatDialog)
  authStore = inject(AuthStore)

  openLogin(): void {
    this.dialog.open(LoginComponent, {
      width: '400px',
    })
  }

  openRegister(): void {
    this.dialog.open(RegisterComponent, {
      width: '600px',
      height: '400px'
    })
  }

  logout(): void {
    this.authStore.clear()
  }
}
