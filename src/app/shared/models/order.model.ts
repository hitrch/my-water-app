import { CartItem } from './cart.model'

export interface Order {
  id: string
  date: Date
  items: CartItem[]
  totalPrice: number
  status: 'pending' | 'delivered' | 'cancelled'
}
