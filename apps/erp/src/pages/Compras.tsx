import { DataTable, type Column } from '@/components/ui/DataTable'
import { mockPurchaseOrders, type PurchaseOrder, type PurchaseStatus } from '@/mocks'
import styles from './Page.module.css'

const statusColors: Record<PurchaseStatus, string> = {
  Aberto: '#6366f1',
  Aprovado: '#0ea5e9',
  'Em Trânsito': '#f59e0b',
  Recebido: '#22c55e',
  Cancelado: '#ef4444',
}

const columns: Column<PurchaseOrder>[] = [
  { key: 'orderNumber', header: 'Nº Pedido' },
  { key: 'supplier', header: 'Fornecedor' },
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
  { key: 'date', header: 'Data', align: 'right' },
  {
    key: 'totalValue',
    header: 'Valor Total',
    align: 'right',
    render: (row) =>
      row.totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  },
]

export function Compras() {
  const openCount = mockPurchaseOrders.filter(
    (o) => o.status === 'Aberto' || o.status === 'Aprovado' || o.status === 'Em Trânsito'
  ).length

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.pageTitle}>Pedidos de Compra</h2>
          <p className={styles.pageDesc}>
            {mockPurchaseOrders.length} pedidos · {openCount} em aberto
          </p>
        </div>
      </div>
      <DataTable<PurchaseOrder>
        columns={columns}
        rows={mockPurchaseOrders}
        keyField="id"
        emptyMessage="Nenhum pedido de compra registrado."
      />
    </div>
  )
}
