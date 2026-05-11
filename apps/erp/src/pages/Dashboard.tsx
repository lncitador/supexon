import { MetricCard } from '@/components/ui/MetricCard'
import { mockItems, mockStockEntries, mockPurchaseOrders, mockProductionOrders } from '@/mocks'

export function Dashboard() {
  const totalItems = mockItems.length
  const stockAlerts = mockStockEntries.filter((s) => s.quantity < s.minQuantity).length
  const openOrders = mockPurchaseOrders.filter(
    (o) => o.status === 'Aberto' || o.status === 'Aprovado' || o.status === 'Em Trânsito'
  ).length
  const productionInProgress = mockProductionOrders.filter(
    (o) => o.status === 'Em Andamento'
  ).length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          label="Total de Itens"
          value={totalItems}
          icon="category"
          accent="default"
        />
        <MetricCard
          label="Alertas de Estoque"
          value={stockAlerts}
          icon="warning"
          accent={stockAlerts > 0 ? 'warning' : 'success'}
        />
        <MetricCard
          label="Pedidos em Aberto"
          value={openOrders}
          icon="local_shipping"
          accent="default"
        />
        <MetricCard
          label="Produção em Andamento"
          value={productionInProgress}
          icon="precision_manufacturing"
          accent="default"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-zinc-200 shadow-sm rounded-sm">
            <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center">
              <h3 className="font-bold text-sm text-zinc-950 tracking-tight uppercase">Ordens de Produção Recentes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-zinc-50/50">
                  <tr>
                    <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-100">Nº OP</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-100">Item</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-100">Status</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-100">Progresso</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {mockProductionOrders.slice(0, 5).map(order => (
                    <tr key={order.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-6 py-3 font-mono text-xs text-zinc-950 font-medium">{order.orderNumber}</td>
                      <td className="px-6 py-3">
                        <div className="text-xs font-semibold text-zinc-900">{order.itemName}</div>
                        <div className="font-mono text-[10px] text-zinc-500">{order.itemCode}</div>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          order.status === 'Em Andamento' ? 'bg-amber-100 text-amber-800' :
                          order.status === 'Concluído' ? 'bg-teal-100 text-teal-800' :
                          order.status === 'Pausado' ? 'bg-zinc-100 text-zinc-600' :
                          order.status === 'Planejado' ? 'bg-zinc-100 text-zinc-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="w-24 bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                          <div className={`h-full ${order.status === 'Concluído' ? 'w-full bg-teal-500' : order.status === 'Em Andamento' ? 'w-1/2 bg-amber-500' : 'w-0'}`} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 shadow-sm rounded-sm">
            <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center">
              <h3 className="font-bold text-sm text-zinc-950 tracking-tight uppercase">Alertas de Estoque</h3>
              <span className="material-symbols-outlined text-red-500 text-[18px]">warning</span>
            </div>
            <div className="p-0">
              {mockStockEntries.filter(s => s.quantity < s.minQuantity).length > 0 ? (
                <div className="divide-y divide-zinc-100">
                  {mockStockEntries.filter(s => s.quantity < s.minQuantity).map(s => (
                    <div key={s.id} className="p-4 hover:bg-zinc-50/50 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-mono text-[10px] font-medium text-zinc-500">{s.itemCode}</div>
                        <div className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Abaixo do mín.</div>
                      </div>
                      <div className="text-sm font-semibold text-zinc-900 mb-2">{s.itemName}</div>
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-zinc-500">Atual:</span>
                          <span className="font-bold text-zinc-900">{s.quantity} {s.unit}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-zinc-500">Mín:</span>
                          <span className="font-medium text-zinc-600">{s.minQuantity} {s.unit}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-sm text-zinc-500">
                  Todos os itens estão acima do estoque mínimo.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
