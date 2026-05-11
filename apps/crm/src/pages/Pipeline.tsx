import { KanbanColumn } from '@/components/ui/KanbanColumn'
import { mockOportunidades, pipelineStages } from '@/mocks'
import type { EtapaOportunidade } from '@/mocks'

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value)
}

export function Pipeline() {
  const byStage = (etapa: EtapaOportunidade) =>
    mockOportunidades.filter((op) => op.etapa === etapa)

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-max">
        {pipelineStages.map((stage) => {
          const cards = byStage(stage.id)
          const total = cards.reduce((sum, c) => sum + c.valorEstimado, 0)

          return (
            <KanbanColumn
              key={stage.id}
              title={stage.label}
              count={cards.length}
              colorClass={stage.color}
            >
              {cards.length === 0 ? (
                <div className="text-[11px] text-zinc-400 text-center py-6">Nenhuma oportunidade</div>
              ) : (
                cards.map((op) => (
                  <div
                    key={op.id}
                    className="bg-white border border-zinc-200 rounded-sm p-3 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <p className="text-xs font-bold text-zinc-900 leading-snug mb-1">{op.titulo}</p>
                    <p className="text-[10px] text-zinc-500 mb-2">{op.clienteNome}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-semibold text-zinc-700">{formatCurrency(op.valorEstimado)}</span>
                      <span className="text-[10px] text-zinc-400">{op.responsavel.split(' ')[0]}</span>
                    </div>
                  </div>
                ))
              )}
              {cards.length > 0 && (
                <div className="pt-2 border-t border-zinc-200 mt-1">
                  <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">Total</p>
                  <p className="font-mono text-xs font-bold text-zinc-900">{formatCurrency(total)}</p>
                </div>
              )}
            </KanbanColumn>
          )
        })}
      </div>
    </div>
  )
}
