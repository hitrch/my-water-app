import {Component, computed, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {AuthUiService} from '../../services/auth-ui.service';
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
  private readonly authUiService = inject(AuthUiService)
  private readonly authStore = inject(AuthStore)

  user = computed(() => this.authStore.user())

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
