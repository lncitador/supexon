import { DataTable, type Column } from '@/components/ui/DataTable'
import { mockProductionOrders, type ProductionOrder } from '@/mocks'

const columns: Column<ProductionOrder>[] = [
  { 
    key: 'orderNumber', 
    header: 'Nº OP',
    render: (row) => <span className="font-mono text-xs font-bold text-zinc-950">{row.orderNumber}</span>
  },
  { 
    key: 'itemCode', 
    header: 'Código',
    render: (row) => <span className="font-mono text-xs text-zinc-500">{row.itemCode}</span>
  },
  { 
    key: 'itemName', 
    header: 'Item',
    render: (row) => <span className="font-semibold text-zinc-900">{row.itemName}</span>
  },
  { 
    key: 'quantity', 
    header: 'Qtd.', 
    align: 'right',
    render: (row) => <span className="font-medium text-zinc-900">{row.quantity}</span>
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => {
      let badgeClass = 'bg-zinc-100 text-zinc-700'
      if (row.status === 'Concluído') badgeClass = 'bg-teal-100 text-teal-800'
      if (row.status === 'Em Andamento') badgeClass = 'bg-amber-100 text-amber-800'
      if (row.status === 'Pausado') badgeClass = 'bg-zinc-200 text-zinc-700'
      if (row.status === 'Cancelado') badgeClass = 'bg-red-100 text-red-800'

      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${badgeClass}`}>
          {row.status}
        </span>
      )
    },
  },
  { 
    key: 'plannedDate', 
    header: 'Previsão', 
    align: 'right',
    render: (row) => <span className="text-zinc-600 text-xs">{new Date(row.plannedDate).toLocaleDateString('pt-BR')}</span>
  },
]

export function Producao() {
  const inProgress = mockProductionOrders.filter((o) => o.status === 'Em Andamento').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-zinc-950 tracking-tight">Ordens de Produção</h2>
            {inProgress > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                {inProgress} ativas
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500 mt-1">{mockProductionOrders.length} ordens no painel.</p>
        </div>
        <button className="bg-zinc-950 text-white hover:bg-zinc-800 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">add</span>
          Nova Ordem
        </button>
      </div>
      <DataTable<ProductionOrder>
        columns={columns}
        rows={mockProductionOrders}
        keyField="id"
        emptyMessage="Nenhuma ordem de produção registrada."
      />
    </div>
  )
}
