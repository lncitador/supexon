import { DataTable, type Column } from '@/components/ui/DataTable'
import { mockPurchaseOrders, type PurchaseOrder } from '@/mocks'

const columns: Column<PurchaseOrder>[] = [
  { 
    key: 'orderNumber', 
    header: 'Nº Pedido',
    render: (row) => <span className="font-mono text-xs font-medium text-zinc-950">{row.orderNumber}</span>
  },
  { 
    key: 'supplier', 
    header: 'Fornecedor',
    render: (row) => <span className="font-medium text-zinc-900">{row.supplier}</span>
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => {
      let badgeClass = 'bg-zinc-100 text-zinc-700'
      if (row.status === 'Recebido') badgeClass = 'bg-teal-100 text-teal-800'
      if (row.status === 'Em Trânsito') badgeClass = 'bg-amber-100 text-amber-800'
      if (row.status === 'Aprovado') badgeClass = 'bg-blue-100 text-blue-800'
      if (row.status === 'Cancelado') badgeClass = 'bg-red-100 text-red-800'

      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${badgeClass}`}>
          {row.status}
        </span>
      )
    },
  },
  { 
    key: 'date', 
    header: 'Data', 
    align: 'right',
    render: (row) => <span className="text-zinc-600 text-xs">{new Date(row.date).toLocaleDateString('pt-BR')}</span>
  },
  {
    key: 'totalValue',
    header: 'Valor Total',
    align: 'right',
    render: (row) => (
      <span className="font-mono text-xs font-semibold text-zinc-900">
        {row.totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </span>
    ),
  },
]

export function Compras() {
  const openCount = mockPurchaseOrders.filter(
    (o) => o.status === 'Aberto' || o.status === 'Aprovado' || o.status === 'Em Trânsito'
  ).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-zinc-950 tracking-tight">Pedidos de Compra</h2>
            {openCount > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-800 border border-zinc-200">
                {openCount} em andamento
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500 mt-1">{mockPurchaseOrders.length} pedidos no histórico.</p>
        </div>
        <button className="bg-zinc-950 text-white hover:bg-zinc-800 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">add</span>
          Novo Pedido
        </button>
      </div>
      <DataTable<PurchaseOrder>
        columns={columns}
        rows={mockPurchaseOrders}
        keyField="id"
        emptyMessage="Nenhum pedido de compra registrado."
      />
    </div>
  )
}
