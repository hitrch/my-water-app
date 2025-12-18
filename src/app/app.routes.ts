import { Routes } from '@angular/router';
import {ShellComponent} from './core/layout/shell/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'shop',
        loadComponent: () => import('./features/shop/shop.component').then(m => m.ShopComponent)
      },
      {
        path: 'orders',
        loadComponent: () => import('./features/orders/orders.component').then(m => m.OrdersComponent)
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
