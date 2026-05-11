import { DataTable, type Column } from '@/components/ui/DataTable'
import { mockBomEntries, type BomEntry } from '@/mocks'

const columns: Column<BomEntry>[] = [
  { 
    key: 'finishedItemCode', 
    header: 'Produto Acabado',
    render: (row) => <span className="font-mono text-xs font-medium text-zinc-950">{row.finishedItemCode}</span>
  },
  { 
    key: 'finishedItemName', 
    header: 'Nome do Produto',
    render: (row) => <span className="font-medium text-zinc-900">{row.finishedItemName}</span>
  },
  { 
    key: 'componentCode', 
    header: 'Componente',
    render: (row) => <span className="font-mono text-xs text-zinc-500">{row.componentCode}</span>
  },
  { 
    key: 'componentName', 
    header: 'Nome Componente',
    render: (row) => <span className="text-zinc-700">{row.componentName}</span>
  },
  { 
    key: 'quantity', 
    header: 'Qtd.', 
    align: 'right',
    render: (row) => <span className="font-medium text-zinc-900">{row.quantity}</span>
  },
  { 
    key: 'unit', 
    header: 'Un.', 
    align: 'center',
    render: (row) => <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-zinc-100 text-zinc-600">{row.unit}</span>
  },
]

export function BOM() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-zinc-950 tracking-tight">Lista de Materiais (BOM)</h2>
          <p className="text-xs text-zinc-500 mt-1">{mockBomEntries.length} vínculos de estrutura de produto.</p>
        </div>
        <button className="bg-zinc-950 text-white hover:bg-zinc-800 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">add</span>
          Nova Estrutura
        </button>
      </div>
      <DataTable<BomEntry>
        columns={columns}
        rows={mockBomEntries}
        keyField="id"
        emptyMessage="Nenhuma estrutura de produto cadastrada."
      />
    </div>
  )
}
