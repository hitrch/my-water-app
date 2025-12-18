import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of, delay } from 'rxjs'
import { Order } from '../../shared/models/order.model'
import {CartItem} from '../../shared/models/cart.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly _http = inject(HttpClient)

  getOrders(): Observable<Order[]> {
    const mockOrders: Order[] = [
      {
        id: 'ORD-123',
        date: new Date(),
        items: [],
        totalPrice: 25.50,
        status: 'delivered'
      }
    ]
    return of(mockOrders).pipe(delay(1000))
  }

  placeOrder(items: CartItem[], total: number): Observable<Order> {
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 1000)}`,
      date: new Date(),
      items,
      totalPrice: total,
      status: 'pending'
    }

    return of(newOrder).pipe(delay(1500))
  }
}
