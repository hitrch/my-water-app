export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'still' | 'sparkling' | 'alkaline';
  volume: string; // e.g. '500ml', '1L'
  stock: number;
}
