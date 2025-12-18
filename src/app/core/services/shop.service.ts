import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private mockProducts: Product[] = [
    {
      id: '1',
      name: 'Alpine Spring',
      description: 'Crystal clear water sourced from high-altitude alpine springs.',
      price: 1.50,
      imageUrl: 'assets/water-alpine.png',
      category: 'still',
      volume: '500ml',
      stock: 50
    },
    {
      id: '2',
      name: 'Sparkling Peak',
      description: 'Naturally carbonated mineral water with a crisp, refreshing finish.',
      price: 2.25,
      imageUrl: 'assets/water-sparkling.png',
      category: 'sparkling',
      volume: '750ml',
      stock: 30
    },
    {
      id: '3',
      name: 'Deep Ocean Alkaline',
      description: 'Ionized alkaline water with an 8.5+ pH for optimal hydration.',
      price: 3.00,
      imageUrl: 'assets/water-alkaline.png',
      category: 'alkaline',
      volume: '1L',
      stock: 25
    }
  ];

  getProducts(): Observable<Product[]> {
    // mimic a real API call
    return of(this.mockProducts).pipe(delay(800));
  }
}
