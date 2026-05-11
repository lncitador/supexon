import { DataTable } from '@/components/ui/DataTable'
import type { Column } from '@/components/ui/DataTable'
import { mockClientes } from '@/mocks'
import type { Cliente } from '@/mocks'

const statusColors: Record<Cliente['status'], string> = {
  Ativo: 'bg-teal-100 text-teal-800',
  Inativo: 'bg-zinc-100 text-zinc-600',
  Prospect: 'bg-blue-100 text-blue-800',
}

const columns: Column<Cliente>[] = [
  {
    key: 'nome',
    header: 'Nome',
    render: (row) => (
      <div>
        <div className="font-semibold text-zinc-900 text-sm">{row.nome}</div>
        <div className="text-[10px] text-zinc-500">{row.email}</div>
      </div>
    ),
  },
  { key: 'segmento', header: 'Segmento' },
  { key: 'contato', header: 'Contato' },
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
    key: 'ultimaInteracao',
    header: 'Última Interação',
    render: (row) => (
      <span className="font-mono text-xs text-zinc-600">
        {new Date(row.ultimaInteracao + 'T00:00:00').toLocaleDateString('pt-BR')}
      </span>
    ),
  },
]

export function Clientes() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">{mockClientes.length} clientes cadastrados</p>
      </div>
      <DataTable columns={columns} rows={mockClientes} keyField="id" emptyMessage="Nenhum cliente encontrado." />
    </div>
  )
}
