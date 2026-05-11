import { DataTable, type Column } from '@/components/ui/DataTable'
import { mockStockEntries, type StockEntry } from '@/mocks'
import styles from './Page.module.css'

const columns: Column<StockEntry>[] = [
  { key: 'itemCode', header: 'Código' },
  { key: 'itemName', header: 'Item' },
  { key: 'location', header: 'Localização' },
  {
    key: 'quantity',
    header: 'Quantidade',
    align: 'right',
    render: (row) => (
      <span style={{ color: row.quantity < row.minQuantity ? 'var(--color-warning)' : undefined, fontWeight: row.quantity < row.minQuantity ? 700 : undefined }}>
        {row.quantity} {row.unit}
      </span>
    ),
  },
  {
    key: 'minQuantity',
    header: 'Mínimo',
    align: 'right',
    render: (row) => `${row.minQuantity} ${row.unit}`,
  },
]

export function Estoque() {
  const alerts = mockStockEntries.filter((s) => s.quantity < s.minQuantity).length

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.pageTitle}>Estoque</h2>
          <p className={styles.pageDesc}>
            {mockStockEntries.length} localizações
            {alerts > 0 && <span className={styles.alertBadge}>{alerts} com estoque baixo</span>}
          </p>
        </div>
      </div>
      <DataTable<StockEntry>
        columns={columns}
        rows={mockStockEntries}
        keyField="id"
        emptyMessage="Nenhum registro de estoque."
      />
    </div>
  )
}
