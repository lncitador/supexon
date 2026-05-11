import type { Product } from '@/mocks/types'

interface ProductCardProps {
  product: Product
  onAdd: (product: Product) => void
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const outOfStock = product.stock === 0

  return (
    <button
      onClick={() => !outOfStock && onAdd(product)}
      disabled={outOfStock}
      className={`w-full text-left bg-white border rounded-sm p-4 flex flex-col gap-2 transition-all hover:shadow-md hover:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-1 ${
        outOfStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="p-2 bg-zinc-100 rounded-sm">
          <span className="material-symbols-outlined text-zinc-600 text-[22px]">inventory_2</span>
        </div>
        {outOfStock ? (
          <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-sm">
            Sem estoque
          </span>
        ) : (
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded-sm">
            {product.stock} un.
          </span>
        )}
      </div>
      <div>
        <p className="text-xs text-zinc-400 font-mono">{product.sku}</p>
        <p className="text-sm font-semibold text-zinc-900 leading-tight mt-0.5 line-clamp-2">{product.name}</p>
        <p className="text-[10px] text-zinc-400 mt-0.5">{product.category}</p>
      </div>
      <p className="text-lg font-black text-zinc-950 tracking-tight">
        {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </p>
    </button>
  )
}
