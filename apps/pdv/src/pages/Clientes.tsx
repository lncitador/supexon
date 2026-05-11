import { useState } from 'react'
import { mockCustomers } from '@/mocks/customers'
import { DataTable } from '@/components/ui/DataTable'
import type { Column } from '@/components/ui/DataTable'
import type { Customer } from '@/mocks/types'

const columns: Column<Customer>[] = [
  { key: 'name', header: 'Nome' },
  { key: 'document', header: 'CPF/CNPJ' },
  { key: 'email', header: 'E-mail' },
  { key: 'phone', header: 'Telefone' },
]

export function Clientes() {
  const [search, setSearch] = useState('')

  const filtered = mockCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.document.includes(search),
  )

  return (
    <>
      <div>
        <h1 className="text-display-md font-black text-zinc-950 tracking-tight">Clientes</h1>
        <p className="text-sm text-zinc-500 mt-1">Base de clientes cadastrados.</p>
      </div>

      <div className="relative max-w-sm">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-[18px]">
          search
        </span>
        <input
          type="text"
          placeholder="Buscar por nome, e-mail ou CPF..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm border border-zinc-200 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950 placeholder:text-zinc-400"
        />
      </div>

      <DataTable columns={columns} rows={filtered} keyField="id" emptyMessage="Nenhum cliente encontrado." />
    </>
  )
}
