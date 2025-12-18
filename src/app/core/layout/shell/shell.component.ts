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

  placeOrder() {
    this.orderStore.placeOrder()
  }
}
