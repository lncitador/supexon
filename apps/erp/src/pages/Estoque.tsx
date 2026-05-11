import { DataTable, type Column } from '@/components/ui/DataTable'
import { mockStockEntries, type StockEntry } from '@/mocks'

const columns: Column<StockEntry>[] = [
  { 
    key: 'itemCode', 
    header: 'Código',
    render: (row) => <span className="font-mono text-xs font-medium text-zinc-950">{row.itemCode}</span>
  },
  { 
    key: 'itemName', 
    header: 'Item',
    render: (row) => <span className="font-medium text-zinc-900">{row.itemName}</span>
  },
  { 
    key: 'location', 
    header: 'Localização',
    render: (row) => <span className="text-zinc-600 text-xs">{row.location}</span>
  },
  {
    key: 'quantity',
    header: 'Quantidade',
    align: 'right',
    render: (row) => {
      const isLow = row.quantity < row.minQuantity
      return (
        <span className={`font-medium ${isLow ? 'text-red-600 font-bold' : 'text-zinc-900'}`}>
          {row.quantity} {row.unit}
        </span>
      )
    },
  },
  {
    key: 'minQuantity',
    header: 'Mínimo',
    align: 'right',
    render: (row) => <span className="text-zinc-500 text-xs">{row.minQuantity} {row.unit}</span>,
  },
]

export function Estoque() {
  const alerts = mockStockEntries.filter((s) => s.quantity < s.minQuantity).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-zinc-950 tracking-tight">Controle de Estoque</h2>
            {alerts > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800">
                {alerts} alertas
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500 mt-1">{mockStockEntries.length} localizações registradas.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-zinc-200 text-zinc-950 hover:bg-zinc-50 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">sync_alt</span>
            Movimentar
          </button>
        </div>
      </div>
      <DataTable<StockEntry>
        columns={columns}
        rows={mockStockEntries}
        keyField="id"
        emptyMessage="Nenhum registro de estoque."
      />
    </div>
  )
}
