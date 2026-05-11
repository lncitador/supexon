// TEMPORARY TYPES — placeholders until Tuyau is connected to @supexon/api/registry

export interface Product {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  category: string
}

export interface CartEntry {
  product: Product
  quantity: number
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  document: string
}

export interface RecentSale {
  id: string
  date: string
  customer: string
  items: number
  total: number
  status: 'concluída' | 'cancelada' | 'pendente'
}

export interface CashRegisterSummary {
  operator: string
  openedAt: string
  openingBalance: number
  salesTotal: number
  expectedClosing: number
  transactionCount: number
}
