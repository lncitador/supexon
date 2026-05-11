import { DataTable, type Column } from '@/components/ui/DataTable'
import { mockProductionOrders, type ProductionOrder, type ProductionStatus } from '@/mocks'
import styles from './Page.module.css'

const statusColors: Record<ProductionStatus, string> = {
  Planejado: '#6366f1',
  'Em Andamento': '#f59e0b',
  Pausado: '#94a3b8',
  Concluído: '#22c55e',
  Cancelado: '#ef4444',
}

const columns: Column<ProductionOrder>[] = [
  { key: 'orderNumber', header: 'Nº OP' },
  { key: 'itemCode', header: 'Código' },
  { key: 'itemName', header: 'Item' },
  { key: 'quantity', header: 'Qtd.', align: 'right' },
  {
    key: 'status',
    header: 'Status',
    render: (row) => (
      <span
        style={{
          display: 'inline-block',
          padding: '0.125rem 0.5rem',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#fff',
          background: statusColors[row.status],
        }}
      >
        {row.status}
      </span>
    ),
  },
  { key: 'plannedDate', header: 'Previsão', align: 'right' },
]

export function Producao() {
  const inProgress = mockProductionOrders.filter((o) => o.status === 'Em Andamento').length

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.pageTitle}>Ordens de Produção</h2>
          <p className={styles.pageDesc}>
            {mockProductionOrders.length} ordens · {inProgress} em andamento
          </p>
        </div>
      </div>
      <DataTable<ProductionOrder>
        columns={columns}
        rows={mockProductionOrders}
        keyField="id"
        emptyMessage="Nenhuma ordem de produção registrada."
      />
    </div>
  )
}
