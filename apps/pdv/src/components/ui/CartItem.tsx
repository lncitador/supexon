import type { CartEntry } from '@/mocks/types'

interface CartItemProps {
  entry: CartEntry
  onIncrease: (productId: string) => void
  onDecrease: (productId: string) => void
  onRemove: (productId: string) => void
}

export function CartItem({ entry, onIncrease, onDecrease, onRemove }: CartItemProps) {
  const subtotal = entry.product.price * entry.quantity

  return (
    <div className="flex items-start gap-3 py-3 border-b border-zinc-100 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-zinc-900 leading-tight truncate">{entry.product.name}</p>
        <p className="text-xs text-zinc-400 font-mono mt-0.5">{entry.product.sku}</p>
        <p className="text-xs text-zinc-500 mt-1">
          {entry.product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} × {entry.quantity}
        </p>
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <p className="text-sm font-black text-zinc-950">
          {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onDecrease(entry.product.id)}
            className="w-6 h-6 flex items-center justify-center rounded-sm border border-zinc-200 text-zinc-600 hover:bg-zinc-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">remove</span>
          </button>
          <span className="text-xs font-bold text-zinc-800 w-5 text-center">{entry.quantity}</span>
          <button
            onClick={() => onIncrease(entry.product.id)}
            className="w-6 h-6 flex items-center justify-center rounded-sm border border-zinc-200 text-zinc-600 hover:bg-zinc-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">add</span>
          </button>
          <button
            onClick={() => onRemove(entry.product.id)}
            className="w-6 h-6 flex items-center justify-center rounded-sm text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors ml-1"
          >
            <span className="material-symbols-outlined text-[14px]">delete</span>
          </button>
        </div>
      </div>
    </div>
  )
}
