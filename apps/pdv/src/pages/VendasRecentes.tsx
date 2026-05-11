import { useState } from 'react'
import { mockRecentSales } from '@/mocks/sales'
import { DataTable } from '@/components/ui/DataTable'
import type { Column } from '@/components/ui/DataTable'
import type { RecentSale } from '@/mocks/types'

const statusStyle: Record<RecentSale['status'], string> = {
  'concluída': 'text-teal-600 bg-teal-50 border-teal-200',
  'cancelada': 'text-red-600 bg-red-50 border-red-200',
  'pendente': 'text-amber-600 bg-amber-50 border-amber-200',
}

const columns: Column<RecentSale>[] = [
  { key: 'id', header: 'Nº Venda' },
  { key: 'date', header: 'Data/Hora' },
  { key: 'customer', header: 'Cliente' },
  { key: 'items', header: 'Itens', align: 'center' },
  {
    key: 'total',
    header: 'Total',
    align: 'right',
    render: (row) => row.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  },
  {
    key: 'status',
    header: 'Status',
    align: 'center',
    render: (row) => (
      <span className={`text-xs font-bold px-2 py-0.5 rounded-sm border ${statusStyle[row.status]}`}>
        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
      </span>
    ),
  },
]

export function VendasRecentes() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<'' | RecentSale['status']>('')

  const filtered = mockRecentSales.filter((s) => {
    const matchSearch =
      s.customer.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = status === '' || s.status === status
    return matchSearch && matchStatus
  })

  const totalConcluidas = mockRecentSales.filter((s) => s.status === 'concluída').reduce((sum, s) => sum + s.total, 0)

  return (
    <>
      <div>
        <h1 className="text-display-md font-black text-zinc-950 tracking-tight">Vendas Recentes</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Histórico de vendas — total concluído:{' '}
          <span className="font-bold text-zinc-800">
            {totalConcluidas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </p>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Buscar por cliente ou nº da venda..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-zinc-200 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950 placeholder:text-zinc-400"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as '' | RecentSale['status'])}
          className="text-sm border border-zinc-200 rounded-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950 text-zinc-700"
        >
          <option value="">Todos os status</option>
          <option value="concluída">Concluída</option>
          <option value="pendente">Pendente</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </div>

      <DataTable columns={columns} rows={filtered} keyField="id" emptyMessage="Nenhuma venda encontrada." />
    </>
  )
}
