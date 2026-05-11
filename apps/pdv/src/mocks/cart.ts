import type { CartEntry } from './types'
import { mockProducts } from './products'

export const mockCartItems: CartEntry[] = [
  { product: mockProducts[1], quantity: 2 },
  { product: mockProducts[4], quantity: 1 },
]
