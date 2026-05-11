import { DataTable } from '@/components/ui/DataTable'
import type { Column } from '@/components/ui/DataTable'
import { mockHistoricoVendas } from '@/mocks'
import type { HistoricoVenda } from '@/mocks'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value)
}

const columns: Column<HistoricoVenda>[] = [
  { key: 'clienteNome', header: 'Cliente' },
  {
    key: 'produtoServico',
    header: 'Produto / Serviço',
    render: (row) => (
      <span className="font-semibold text-zinc-900 text-sm">{row.produtoServico}</span>
    ),
  },
  {
    key: 'valor',
    header: 'Valor',
    align: 'right',
    render: (row) => (
      <span className="font-mono text-xs font-semibold text-teal-700">{formatCurrency(row.valor)}</span>
    ),
  },
  {
    key: 'dataFechamento',
    header: 'Data de Fechamento',
    render: (row) => (
      <span className="font-mono text-xs text-zinc-600">
        {new Date(row.dataFechamento + 'T00:00:00').toLocaleDateString('pt-BR')}
      </span>
    ),
  },
  { key: 'responsavel', header: 'Responsável' },
]

export function HistoricoVendas() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">{mockHistoricoVendas.length} vendas fechadas</p>
      </div>
      <DataTable columns={columns} rows={mockHistoricoVendas} keyField="id" emptyMessage="Nenhuma venda encontrada." />
    </div>
  )
}
