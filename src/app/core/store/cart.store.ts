import { inject, Injectable, signal, computed } from '@angular/core'
import { Product } from '../../shared/models/product.model'
import { CartItem } from '../../shared/models/cart.model'
import { NotificationService } from '../services/notification.service'

@Injectable({ providedIn: 'root' })
export class CartStore {
  private readonly _notificationService = inject(NotificationService)

  private readonly _items = signal<CartItem[]>([])

  readonly items = computed(() => this._items())
  readonly totalItems = computed(() =>
    this._items().reduce((acc, item) => acc + item.quantity, 0)
  )
  readonly totalPrice = computed(() =>
    this._items().reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
  )

  addToCart(product: Product) {
    this._items.update(items => {
      const existingItem = items.find(i => i.product.id === product.id)

      if (existingItem) {
        return items.map(i => i.product.id === product.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
        )
      }

      return [...items, { product, quantity: 1 }]
    })

    this._notificationService.showSuccess(`${product.name} added to cart!`)
  }

  removeFromCart(productId: string) {
    this._items.update(items => items.filter(i => i.product.id !== productId))
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId)
      return
    }
    this._items.update(items => items.map(i =>
      i.product.id === productId ? { ...i, quantity } : i
    ))
  }

  clearCart() {
    this._items.set([])
  }
}
