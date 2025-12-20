import { Routes } from '@angular/router';
import {ShellComponent} from './core/layout/shell/shell.component';
import {HomeComponent} from './features/home/home.component';
import {AuthGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Welcome to My Water App'
      },
      {
        path: 'shop',
        loadComponent: () => import('./features/shop/shop.component').then(m => m.ShopComponent)
      },
      {
        path: 'orders',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/orders/orders.component').then(m => m.OrdersComponent)
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
