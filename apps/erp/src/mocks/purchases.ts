// TEMPORARY MOCK DATA — replace with Tuyau API calls once codegen is ready

export type PurchaseStatus = 'Aberto' | 'Aprovado' | 'Em Trânsito' | 'Recebido' | 'Cancelado'

export interface PurchaseOrder {
  id: string
  orderNumber: string
  supplier: string
  status: PurchaseStatus
  date: string
  totalValue: number
}

export const mockPurchaseOrders: PurchaseOrder[] = [
  { id: '1', orderNumber: 'OC-2025-001', supplier: 'Aços Villares S.A.', status: 'Recebido', date: '2025-04-10', totalValue: 8750.00 },
  { id: '2', orderNumber: 'OC-2025-002', supplier: 'Ferragista Central Ltda.', status: 'Recebido', date: '2025-04-18', totalValue: 1230.50 },
  { id: '3', orderNumber: 'OC-2025-003', supplier: 'Química Industrial Norte', status: 'Em Trânsito', date: '2025-05-02', totalValue: 3400.00 },
  { id: '4', orderNumber: 'OC-2025-004', supplier: 'Aços Villares S.A.', status: 'Aprovado', date: '2025-05-05', totalValue: 12600.00 },
  { id: '5', orderNumber: 'OC-2025-005', supplier: 'Rolamentos BR Distribuidora', status: 'Aberto', date: '2025-05-09', totalValue: 2180.00 },
  { id: '6', orderNumber: 'OC-2025-006', supplier: 'Ferragista Central Ltda.', status: 'Aberto', date: '2025-05-10', totalValue: 890.00 },
  { id: '7', orderNumber: 'OC-2025-007', supplier: 'Química Industrial Norte', status: 'Cancelado', date: '2025-04-28', totalValue: 1500.00 },
]
