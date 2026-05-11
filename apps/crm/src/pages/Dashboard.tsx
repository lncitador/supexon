import { MetricCard } from '@/components/ui/MetricCard'
import { mockDashboardMetrics, mockOportunidades, mockPropostas, mockClientes } from '@/mocks'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value)
}

export function Dashboard() {
  const recentOpportunities = mockOportunidades.slice(0, 5)
  const recentPropostas = mockPropostas.slice(0, 4)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          label="Total de Clientes"
          value={mockDashboardMetrics.totalClientes}
          icon="group"
          accent="default"
        />
        <MetricCard
          label="Oportunidades Abertas"
          value={mockDashboardMetrics.oportunidadesAbertas}
          icon="trending_up"
          accent="default"
        />
        <MetricCard
          label="Propostas Enviadas"
          value={mockDashboardMetrics.propostasEnviadas}
          icon="description"
          accent={mockDashboardMetrics.propostasEnviadas > 0 ? 'warning' : 'default'}
        />
        <MetricCard
          label="Receita do Mês"
          value={formatCurrency(mockDashboardMetrics.receitaMensal)}
          icon="payments"
          accent="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-zinc-200 shadow-sm rounded-sm">
            <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center">
              <h3 className="font-bold text-sm text-zinc-950 tracking-tight uppercase">Oportunidades Recentes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-zinc-50/50">
                  <tr>
                    <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-100">Título</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-100">Cliente</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-100">Etapa</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-100 text-right">Valor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {recentOpportunities.map(op => (
                    <tr key={op.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-6 py-3 text-xs font-semibold text-zinc-900">{op.titulo}</td>
                      <td className="px-6 py-3 text-xs text-zinc-600">{op.clienteNome}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          op.etapa === 'Fechado' ? 'bg-teal-100 text-teal-800' :
                          op.etapa === 'Negociação' ? 'bg-orange-100 text-orange-800' :
                          op.etapa === 'Proposta' ? 'bg-amber-100 text-amber-800' :
                          op.etapa === 'Qualificação' ? 'bg-blue-100 text-blue-800' :
                          'bg-zinc-100 text-zinc-700'
                        }`}>
                          {op.etapa}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-xs font-mono text-zinc-900 text-right">{formatCurrency(op.valorEstimado)}</td>
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
              <h3 className="font-bold text-sm text-zinc-950 tracking-tight uppercase">Propostas Recentes</h3>
              <span className="material-symbols-outlined text-zinc-400 text-[18px]">description</span>
            </div>
            <div className="divide-y divide-zinc-100">
              {recentPropostas.map(p => (
                <div key={p.id} className="p-4 hover:bg-zinc-50/50 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-mono text-[10px] font-medium text-zinc-500">{p.numero}</div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      p.status === 'Aceita' ? 'bg-teal-100 text-teal-800' :
                      p.status === 'Enviada' ? 'bg-amber-100 text-amber-800' :
                      p.status === 'Recusada' ? 'bg-red-100 text-red-800' :
                      'bg-zinc-100 text-zinc-700'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-zinc-900 mb-1">{p.clienteNome}</div>
                  <div className="text-xs font-mono text-zinc-500">{formatCurrency(p.valor)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-zinc-200 shadow-sm rounded-sm">
            <div className="px-6 py-4 border-b border-zinc-100">
              <h3 className="font-bold text-sm text-zinc-950 tracking-tight uppercase">Clientes Ativos</h3>
            </div>
            <div className="p-4">
              <p className="text-2xl font-black text-zinc-950">{mockClientes.filter(c => c.status === 'Ativo').length}</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">de {mockClientes.length} cadastrados</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
