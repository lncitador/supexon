// TEMPORARY MOCK DATA — replace with Tuyau API calls once codegen is ready

export interface BomEntry {
  id: string
  finishedItemCode: string
  finishedItemName: string
  componentCode: string
  componentName: string
  quantity: number
  unit: string
}

export const mockBomEntries: BomEntry[] = [
  { id: '1', finishedItemCode: 'PA-001', finishedItemName: 'Estrutura Metálica Modelo A', componentCode: 'MP-001', componentName: 'Chapa de Aço 3mm', quantity: 25, unit: 'kg' },
  { id: '2', finishedItemCode: 'PA-001', finishedItemName: 'Estrutura Metálica Modelo A', componentCode: 'MP-002', componentName: 'Parafuso M8x30', quantity: 48, unit: 'un' },
  { id: '3', finishedItemCode: 'PA-001', finishedItemName: 'Estrutura Metálica Modelo A', componentCode: 'MP-003', componentName: 'Tinta Epóxi Preta', quantity: 2, unit: 'L' },
  { id: '4', finishedItemCode: 'PA-001', finishedItemName: 'Estrutura Metálica Modelo A', componentCode: 'MP-004', componentName: 'Tubo Quadrado 40x40', quantity: 12, unit: 'm' },
  { id: '5', finishedItemCode: 'PA-002', finishedItemName: 'Suporte Industrial XL', componentCode: 'MP-001', componentName: 'Chapa de Aço 3mm', quantity: 40, unit: 'kg' },
  { id: '6', finishedItemCode: 'PA-002', finishedItemName: 'Suporte Industrial XL', componentCode: 'MP-002', componentName: 'Parafuso M8x30', quantity: 80, unit: 'un' },
  { id: '7', finishedItemCode: 'PA-002', finishedItemName: 'Suporte Industrial XL', componentCode: 'SC-001', componentName: 'Rolamento 6205', quantity: 4, unit: 'un' },
  { id: '8', finishedItemCode: 'PA-002', finishedItemName: 'Suporte Industrial XL', componentCode: 'MP-004', componentName: 'Tubo Quadrado 40x40', quantity: 20, unit: 'm' },
]
