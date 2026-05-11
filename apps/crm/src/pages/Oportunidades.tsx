import { DataTable } from '@/components/ui/DataTable'
import type { Column } from '@/components/ui/DataTable'
import { mockOportunidades } from '@/mocks'
import type { Oportunidade, EtapaOportunidade } from '@/mocks'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value)
}

const etapaColors: Record<EtapaOportunidade, string> = {
  'Prospecção': 'bg-zinc-100 text-zinc-700',
  'Qualificação': 'bg-blue-100 text-blue-800',
  'Proposta': 'bg-amber-100 text-amber-800',
  'Negociação': 'bg-orange-100 text-orange-800',
  'Fechado': 'bg-teal-100 text-teal-800',
}

const columns: Column<Oportunidade>[] = [
  {
    key: 'titulo',
    header: 'Título',
    render: (row) => (
      <span className="font-semibold text-zinc-900 text-sm">{row.titulo}</span>
    ),
  },
  { key: 'clienteNome', header: 'Cliente' },
  {
    key: 'etapa',
    header: 'Etapa',
    render: (row) => (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${etapaColors[row.etapa]}`}>
        {row.etapa}
      </span>
    ),
  },
  {
    key: 'valorEstimado',
    header: 'Valor Estimado',
    align: 'right',
    render: (row) => (
      <span className="font-mono text-xs text-zinc-900">{formatCurrency(row.valorEstimado)}</span>
    ),
  },
  {
    key: 'dataPrevistaoFechamento',
    header: 'Prev. Fechamento',
    render: (row) => (
      <span className="font-mono text-xs text-zinc-600">
        {new Date(row.dataPrevistaoFechamento + 'T00:00:00').toLocaleDateString('pt-BR')}
      </span>
    ),
  },
  { key: 'responsavel', header: 'Responsável' },
]

export function Oportunidades() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">{mockOportunidades.length} oportunidades</p>
      </div>
      <DataTable columns={columns} rows={mockOportunidades} keyField="id" emptyMessage="Nenhuma oportunidade encontrada." />
    </div>
  )
}
