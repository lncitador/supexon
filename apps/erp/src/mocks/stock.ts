// TEMPORARY MOCK DATA — replace with Tuyau API calls once codegen is ready

export interface StockEntry {
  id: string
  itemCode: string
  itemName: string
  location: string
  quantity: number
  minQuantity: number
  unit: string
}

export const mockStockEntries: StockEntry[] = [
  { id: '1', itemCode: 'MP-001', itemName: 'Chapa de Aço 3mm', location: 'Armazém A - Prateleira 1', quantity: 450, minQuantity: 100, unit: 'kg' },
  { id: '2', itemCode: 'MP-002', itemName: 'Parafuso M8x30', location: 'Armazém A - Prateleira 5', quantity: 2800, minQuantity: 500, unit: 'un' },
  { id: '3', itemCode: 'MP-003', itemName: 'Tinta Epóxi Preta', location: 'Armazém B - Setor Químico', quantity: 18, minQuantity: 20, unit: 'L' },
  { id: '4', itemCode: 'PA-001', itemName: 'Estrutura Metálica Modelo A', location: 'Expedição - Lote 3', quantity: 5, minQuantity: 2, unit: 'un' },
  { id: '5', itemCode: 'PA-002', itemName: 'Suporte Industrial XL', location: 'Expedição - Lote 4', quantity: 1, minQuantity: 3, unit: 'un' },
  { id: '6', itemCode: 'MP-004', itemName: 'Tubo Quadrado 40x40', location: 'Armazém A - Área Tubular', quantity: 340, minQuantity: 50, unit: 'm' },
  { id: '7', itemCode: 'MP-005', itemName: 'Eletrodo 6013 3.25mm', location: 'Armazém B - Prateleira 2', quantity: 12, minQuantity: 15, unit: 'kg' },
  { id: '8', itemCode: 'SC-001', itemName: 'Rolamento 6205', location: 'Armazém A - Prateleira 8', quantity: 60, minQuantity: 20, unit: 'un' },
]
