import { useState } from 'react'
import { mockProducts } from '@/mocks/products'
import { DataTable } from '@/components/ui/DataTable'
import type { Column } from '@/components/ui/DataTable'
import type { Product } from '@/mocks/types'

const columns: Column<Product>[] = [
  { key: 'sku', header: 'SKU' },
  { key: 'name', header: 'Produto' },
  { key: 'category', header: 'Categoria' },
  {
    key: 'price',
    header: 'Preço',
    align: 'right',
    render: (row) => row.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  },
  {
    key: 'stock',
    header: 'Estoque',
    align: 'center',
    render: (row) => (
      <span
        className={`text-xs font-bold px-2 py-0.5 rounded-sm ${
          row.stock === 0
            ? 'text-red-600 bg-red-50 border border-red-200'
            : row.stock < 10
            ? 'text-amber-600 bg-amber-50 border border-amber-200'
            : 'text-teal-600 bg-teal-50 border border-teal-200'
        }`}
      >
        {row.stock} un.
      </span>
    ),
  },
]

export function Produtos() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const categories = Array.from(new Set(mockProducts.map((p) => p.category))).sort()

  const filtered = mockProducts.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === '' || p.category === category
    return matchSearch && matchCategory
  })

  return (
    <>
      <div>
        <h1 className="text-display-md font-black text-zinc-950 tracking-tight">Produtos</h1>
        <p className="text-sm text-zinc-500 mt-1">Catálogo de produtos disponíveis para venda.</p>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Buscar por nome ou SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-zinc-200 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950 placeholder:text-zinc-400"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-sm border border-zinc-200 rounded-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950 text-zinc-700"
        >
          <option value="">Todas as categorias</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <DataTable columns={columns} rows={filtered} keyField="id" emptyMessage="Nenhum produto encontrado." />
    </>
  )
}
