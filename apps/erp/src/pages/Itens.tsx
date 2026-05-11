import { DataTable, type Column } from '@/components/ui/DataTable'
import { mockItems, type Item } from '@/mocks'

const columns: Column<Item>[] = [
  { 
    key: 'code', 
    header: 'Código',
    render: (row) => <span className="font-mono text-xs font-medium text-zinc-950">{row.code}</span>
  },
  { 
    key: 'name', 
    header: 'Nome',
    render: (row) => <span className="font-medium text-zinc-900">{row.name}</span>
  },
  { 
    key: 'category', 
    header: 'Categoria',
    render: (row) => <span className="text-zinc-600">{row.category}</span>
  },
  { 
    key: 'unit', 
    header: 'Unidade', 
    align: 'center',
    render: (row) => <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-zinc-100 text-zinc-600">{row.unit}</span>
  },
]

export function Itens() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-zinc-950 tracking-tight">Cadastro de Itens</h2>
          <p className="text-xs text-zinc-500 mt-1">{mockItems.length} itens cadastrados no sistema.</p>
        </div>
        <button className="bg-zinc-950 text-white hover:bg-zinc-800 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">add</span>
          Novo Item
        </button>
      </div>
      <DataTable<Item>
        columns={columns}
        rows={mockItems}
        keyField="id"
        emptyMessage="Nenhum item cadastrado."
      />
    </div>
  )
}
