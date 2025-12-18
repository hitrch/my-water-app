import {Component, computed, inject, output} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {AuthUiService} from '../../services/auth-ui.service';
import {AuthStore} from '../../store/auth.store';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {CartStore} from '../../store/cart.store';

@Component({
  selector: 'app-header',
  imports: [
    MatButton,
    NgOptimizedImage,
    RouterLink,
    MatIconButton,
    MatIcon,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  protected readonly authUiService = inject(AuthUiService)
  protected readonly authStore = inject(AuthStore)
  protected readonly cartStore = inject(CartStore)

  protected user = computed(() => this.authStore.user())
  protected cartCount = computed(() => this.cartStore.totalItems())
  protected menuToggle = output<void>()

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
