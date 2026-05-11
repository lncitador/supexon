import { DataTable } from '@/components/ui/DataTable'
import type { Column } from '@/components/ui/DataTable'
import { mockPropostas } from '@/mocks'
import type { Proposta, StatusProposta } from '@/mocks'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value)
}

const statusColors: Record<StatusProposta, string> = {
  Rascunho: 'bg-zinc-100 text-zinc-600',
  Enviada: 'bg-amber-100 text-amber-800',
  Aceita: 'bg-teal-100 text-teal-800',
  Recusada: 'bg-red-100 text-red-800',
}

const columns: Column<Proposta>[] = [
  {
    key: 'numero',
    header: 'Número',
    render: (row) => (
      <span className="font-mono text-xs font-medium text-zinc-900">{row.numero}</span>
    ),
  },
  { key: 'clienteNome', header: 'Cliente' },
  {
    key: 'valor',
    header: 'Valor',
    align: 'right',
    render: (row) => (
      <span className="font-mono text-xs text-zinc-900">{formatCurrency(row.valor)}</span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${statusColors[row.status]}`}>
        {row.status}
      </span>
    ),
  },
  {
    key: 'dataCriacao',
    header: 'Data de Criação',
    render: (row) => (
      <span className="font-mono text-xs text-zinc-600">
        {new Date(row.dataCriacao + 'T00:00:00').toLocaleDateString('pt-BR')}
      </span>
    ),
  },
]

export function Propostas() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">{mockPropostas.length} propostas</p>
      </div>
      <DataTable columns={columns} rows={mockPropostas} keyField="id" emptyMessage="Nenhuma proposta encontrada." />
    </div>
  )
}
