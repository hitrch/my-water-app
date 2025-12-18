import { Component, inject, OnInit } from '@angular/core'
import { ShopStore } from '../../core/store/shop.store'
import { CartStore } from '../../core/store/cart.store'
import { Product } from '../../shared/models/product.model'
import { CurrencyPipe } from '@angular/common'
import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatProgressSpinner } from '@angular/material/progress-spinner'

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatButton,
    MatIcon,
    MatProgressSpinner
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  protected readonly shopStore = inject(ShopStore)
  protected readonly cartStore = inject(CartStore)

  ngOnInit() {
    this.shopStore.loadProducts()
  }

  addToCart(product: Product) {
    this.cartStore.addToCart(product)
  }
}
