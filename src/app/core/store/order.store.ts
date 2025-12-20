import { inject, Injectable, signal, computed } from '@angular/core'
import { OrderService } from '../services/order.service'
import { Order } from '../../shared/models/order.model'
import { CartStore } from './cart.store'
import { NotificationService } from '../services/notification.service'
import { finalize, tap } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class OrderStore {
  private readonly _orderService = inject(OrderService)
  private readonly _cartStore = inject(CartStore)
  private readonly _notificationService = inject(NotificationService)

  private readonly _orders = signal<Order[]>([])
  private readonly _isLoading = signal(false)

  readonly orders = computed(() => this._orders())
  readonly isLoading = computed(() => this._isLoading())

  loadOrders() {
    if (this._orders().length > 0) return

    this._isLoading.set(true)
    this._orderService.getOrders()
      .pipe(finalize(() => this._isLoading.set(false)))
      .subscribe(orders => this._orders.set(orders))
  }

  placeOrder() {
    const items = this._cartStore.items()
    const total = this._cartStore.totalPrice()

    if (items.length === 0) return

    this._isLoading.set(true)
    this._orderService.placeOrder(items, total)
      .pipe(
        tap(newOrder => {
          // Add to local history
          this._orders.update(orders => [newOrder, ...orders])
          // Clear the cart
          this._cartStore.clearCart()
          // Notify the user
          this._notificationService.showSuccess('Order placed! Your water is on the way.')
        }),
        finalize(() => this._isLoading.set(false))
      )
      .subscribe({
        error: (err) => {
          console.error('Order failed', err)
          this._notificationService.showError('Failed to place order. Please try again.')
        }
      })
  }
}
