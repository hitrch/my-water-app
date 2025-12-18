import { inject, Injectable, signal, computed } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Product } from '../../shared/models/product.model';
import { finalize } from 'rxjs';
import {NotificationService} from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ShopStore {
  private readonly _shopService = inject(ShopService)
  private readonly _notificationService = inject(NotificationService)

  private readonly _products = signal<Product[]>([])
  private readonly _isLoading = signal(false)

  readonly products = computed(() => this._products())
  readonly isLoading = computed(() => this._isLoading())
  readonly productCount = computed(() => this._products().length)

  loadProducts() {
    if (this._products().length > 0) return

    this._isLoading.set(true)

    this._shopService.getProducts()
      .pipe(finalize(() => this._isLoading.set(false)))
      .subscribe({
        next: (products) => this._products.set(products),
        error: (err) => {
          console.error('Failed to load products', err)
          this._notificationService.showError('Hydration alert: Failed to load products.')
        }
      })
  }
}
