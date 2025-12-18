import {Component, inject} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {CartStore} from '../../store/cart.store';
import {OrderStore} from '../../store/order.store';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {CurrencyPipe} from '@angular/common';
import {AuthStore} from '../../store/auth.store';
import {AuthUiService} from '../../services/auth-ui.service';

@Component({
  selector: 'app-shell',
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterOutlet,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    RouterLink,
    MatIcon,
    MatIconButton,
    CurrencyPipe,
    MatButton
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {
  protected readonly cartStore = inject(CartStore)
  protected readonly orderStore = inject(OrderStore)
  protected readonly authStore = inject(AuthStore)
  protected readonly authUiService = inject(AuthUiService)

  placeOrder() {
    this.orderStore.placeOrder()
  }

  openLogin() {
    void this.authUiService.openLogin()
  }

  openRegister() {
    void this.authUiService.openRegister()
  }

  logout() {
    this.authStore.clear()
  }
}
