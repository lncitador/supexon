// TEMPORARY MOCK DATA — replace with Tuyau API calls once codegen is ready

export interface Item {
  id: string
  code: string
  name: string
  unit: string
  category: string
}

export const mockItems: Item[] = [
  { id: '1', code: 'MP-001', name: 'Chapa de Aço 3mm', unit: 'kg', category: 'Matéria-prima' },
  { id: '2', code: 'MP-002', name: 'Parafuso M8x30', unit: 'un', category: 'Fixadores' },
  { id: '3', code: 'MP-003', name: 'Tinta Epóxi Preta', unit: 'L', category: 'Acabamento' },
  { id: '4', code: 'PA-001', name: 'Estrutura Metálica Modelo A', unit: 'un', category: 'Produto Acabado' },
  { id: '5', code: 'PA-002', name: 'Suporte Industrial XL', unit: 'un', category: 'Produto Acabado' },
  { id: '6', code: 'MP-004', name: 'Tubo Quadrado 40x40', unit: 'm', category: 'Matéria-prima' },
  { id: '7', code: 'MP-005', name: 'Eletrodo 6013 3.25mm', unit: 'kg', category: 'Consumíveis' },
  { id: '8', code: 'SC-001', name: 'Rolamento 6205', unit: 'un', category: 'Componentes' },
]
