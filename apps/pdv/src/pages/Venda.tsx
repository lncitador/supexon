import { useState } from 'react'
import type { CartEntry, Product } from '@/mocks/types'
import { mockProducts } from '@/mocks/products'
import { ProductCard } from '@/components/ui/ProductCard'
import { CartItem } from '@/components/ui/CartItem'
import { Button } from '@/components/ui/Button'

export function Venda() {
  const [cart, setCart] = useState<CartEntry[]>([])
  const [search, setSearch] = useState('')

  const filtered = mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  )

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((e) => e.product.id === product.id)
      if (existing) {
        return prev.map((e) =>
          e.product.id === product.id ? { ...e, quantity: e.quantity + 1 } : e,
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  function increase(productId: string) {
    setCart((prev) =>
      prev.map((e) =>
        e.product.id === productId ? { ...e, quantity: e.quantity + 1 } : e,
      ),
    )
  }

  function decrease(productId: string) {
    setCart((prev) =>
      prev
        .map((e) =>
          e.product.id === productId ? { ...e, quantity: e.quantity - 1 } : e,
        )
        .filter((e) => e.quantity > 0),
    )
  }

  function remove(productId: string) {
    setCart((prev) => prev.filter((e) => e.product.id !== productId))
  }

  function clearCart() {
    setCart([])
  }

  const total = cart.reduce((sum, e) => sum + e.product.price * e.quantity, 0)
  const itemCount = cart.reduce((sum, e) => sum + e.quantity, 0)

  function finalizeSale() {
    alert('Venda finalizada! (ação não implementada — aguarda integração com API)')
    setCart([])
  }

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col min-w-0 border-r border-zinc-200 bg-zinc-50/30">
        <div className="p-4 bg-white border-b border-zinc-200">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar produto por nome, SKU ou categoria..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-zinc-200 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:border-transparent placeholder:text-zinc-400"
            />
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-zinc-400 gap-2">
              <span className="material-symbols-outlined text-[40px]">search_off</span>
              <p className="text-sm">Nenhum produto encontrado.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={addToCart} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-80 xl:w-96 flex flex-col bg-white shrink-0">
        <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-950">Carrinho</h3>
            <p className="text-xs text-zinc-400 mt-0.5">{itemCount} {itemCount === 1 ? 'item' : 'itens'}</p>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              Limpar
            </button>
          )}
        </div>

        <div className="flex-1 overflow-auto px-5 py-2">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-zinc-400 gap-2 py-12">
              <span className="material-symbols-outlined text-[48px]">shopping_cart</span>
              <p className="text-sm text-center">Selecione produtos ao lado para adicioná-los ao carrinho.</p>
            </div>
          ) : (
            cart.map((entry) => (
              <CartItem
                key={entry.product.id}
                entry={entry}
                onIncrease={increase}
                onDecrease={decrease}
                onRemove={remove}
              />
            ))
          )}
        </div>

        <div className="border-t border-zinc-200 p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Subtotal ({itemCount} itens)</span>
            <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Desconto</span>
            <span>R$ 0,00</span>
          </div>
          <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
            <span className="text-sm font-bold text-zinc-950">Total</span>
            <span className="text-xl font-black text-zinc-950">
              {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
          <Button
            onClick={finalizeSale}
            disabled={cart.length === 0}
            className="w-full"
            size="lg"
          >
            <span className="material-symbols-outlined text-[18px]">point_of_sale</span>
            Finalizar Venda
          </Button>
        </div>
      </div>
    </div>
  )
}
