// TEMPORARY MOCK DATA — replace with Tuyau API calls once codegen is ready

export type ProductionStatus = 'Planejado' | 'Em Andamento' | 'Pausado' | 'Concluído' | 'Cancelado'

export interface ProductionOrder {
  id: string
  orderNumber: string
  itemCode: string
  itemName: string
  quantity: number
  status: ProductionStatus
  plannedDate: string
}

export const mockProductionOrders: ProductionOrder[] = [
  { id: '1', orderNumber: 'OP-2025-001', itemCode: 'PA-001', itemName: 'Estrutura Metálica Modelo A', quantity: 10, status: 'Concluído', plannedDate: '2025-04-20' },
  { id: '2', orderNumber: 'OP-2025-002', itemCode: 'PA-002', itemName: 'Suporte Industrial XL', quantity: 5, status: 'Em Andamento', plannedDate: '2025-05-15' },
  { id: '3', orderNumber: 'OP-2025-003', itemCode: 'PA-001', itemName: 'Estrutura Metálica Modelo A', quantity: 8, status: 'Planejado', plannedDate: '2025-05-25' },
  { id: '4', orderNumber: 'OP-2025-004', itemCode: 'PA-002', itemName: 'Suporte Industrial XL', quantity: 3, status: 'Planejado', plannedDate: '2025-06-05' },
  { id: '5', orderNumber: 'OP-2025-005', itemCode: 'PA-001', itemName: 'Estrutura Metálica Modelo A', quantity: 15, status: 'Em Andamento', plannedDate: '2025-05-18' },
  { id: '6', orderNumber: 'OP-2025-006', itemCode: 'PA-002', itemName: 'Suporte Industrial XL', quantity: 2, status: 'Pausado', plannedDate: '2025-05-12' },
]
