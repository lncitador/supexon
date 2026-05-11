import { mockCashRegister } from '@/mocks/cashregister'
import { MetricCard } from '@/components/ui/MetricCard'
import { Button } from '@/components/ui/Button'

export function Caixa() {
  const cr = mockCashRegister

  function handleOpen() {
    alert('Abrir caixa (ação não implementada — aguarda integração com API)')
  }

  function handleClose() {
    alert('Fechar caixa (ação não implementada — aguarda integração com API)')
  }

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-display-md font-black text-zinc-950 tracking-tight">Caixa</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Sessão de caixa do dia — operador:{' '}
            <span className="font-semibold text-zinc-700">{cr.operator}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleOpen}>
            <span className="material-symbols-outlined text-[16px]">lock_open</span>
            Abrir Caixa
          </Button>
          <Button variant="danger" onClick={handleClose}>
            <span className="material-symbols-outlined text-[16px]">lock</span>
            Fechar Caixa
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Saldo de Abertura"
          value={cr.openingBalance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          icon="account_balance_wallet"
        />
        <MetricCard
          label="Total em Vendas"
          value={cr.salesTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          icon="trending_up"
          accent="success"
        />
        <MetricCard
          label="Transações"
          value={cr.transactionCount}
          icon="receipt_long"
        />
        <MetricCard
          label="Saldo Esperado no Fechamento"
          value={cr.expectedClosing.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          icon="payments"
          accent="success"
        />
      </div>

      <div className="bg-white border border-zinc-200 rounded-sm shadow-sm p-6">
        <h2 className="text-sm font-bold text-zinc-950 mb-4 uppercase tracking-widest text-[11px]">
          Detalhes da Sessão
        </h2>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-zinc-400 text-xs font-medium">Operador</dt>
            <dd className="font-semibold text-zinc-800 mt-0.5">{cr.operator}</dd>
          </div>
          <div>
            <dt className="text-zinc-400 text-xs font-medium">Abertura do Caixa</dt>
            <dd className="font-semibold text-zinc-800 mt-0.5">{cr.openedAt}</dd>
          </div>
          <div>
            <dt className="text-zinc-400 text-xs font-medium">Status</dt>
            <dd className="mt-0.5">
              <span className="text-xs font-bold px-2 py-0.5 rounded-sm text-teal-600 bg-teal-50 border border-teal-200">
                Aberto
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-zinc-400 text-xs font-medium">Número de Transações</dt>
            <dd className="font-semibold text-zinc-800 mt-0.5">{cr.transactionCount} vendas</dd>
          </div>
        </dl>
      </div>
    </>
  )
}
