import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {OrderStore} from '../../core/store/order.store';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatIcon} from '@angular/material/icon';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [
    MatButton,
    RouterLink,
    MatProgressSpinner,
    MatIcon,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  protected readonly orderStore = inject(OrderStore)

  ngOnInit() {
    this.orderStore.loadOrders()
  }
}
