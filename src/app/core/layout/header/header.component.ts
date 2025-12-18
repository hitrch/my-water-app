import {Component, computed, inject, output} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {AuthUiService} from '../../services/auth-ui.service';
import {AuthStore} from '../../store/auth.store';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [
    MatButton,
    NgOptimizedImage,
    RouterLink,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly authUiService = inject(AuthUiService)
  private readonly authStore = inject(AuthStore)
  user = computed(() => this.authStore.user())
  menuToggle = output<void>()

  openMenu(): void {
    this.menuToggle.emit()
  }

  openRegister(): void {
    void this.authUiService.openRegister()
  }

  openLogin(): void {
    void this.authUiService.openLogin()
  }

  logout(): void {
    this.authStore.clear()
  }
}
