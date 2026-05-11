import { MetricCard } from '@/components/ui/MetricCard'
import { mockItems, mockStockEntries, mockPurchaseOrders, mockProductionOrders } from '@/mocks'
import styles from './Dashboard.module.css'

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
    <div className={styles.page}>
      <div className={styles.metrics}>
        <MetricCard
          label="Total de Itens"
          value={totalItems}
          icon="▤"
          accent="default"
        />
        <MetricCard
          label="Alertas de Estoque"
          value={stockAlerts}
          icon="▦"
          accent={stockAlerts > 0 ? 'warning' : 'success'}
        />
        <MetricCard
          label="Pedidos em Aberto"
          value={openOrders}
          icon="◈"
          accent="default"
        />
        <MetricCard
          label="Produção em Andamento"
          value={productionInProgress}
          icon="⚙"
          accent="default"
        />
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Alertas de Estoque Baixo</h2>
        <div className={styles.alertList}>
          {mockStockEntries
            .filter((s) => s.quantity < s.minQuantity)
            .map((s) => (
              <div key={s.id} className={styles.alertRow}>
                <div className={styles.alertInfo}>
                  <span className={styles.alertCode}>{s.itemCode}</span>
                  <span className={styles.alertName}>{s.itemName}</span>
                </div>
                <div className={styles.alertQty}>
                  <span className={styles.alertCurrent}>{s.quantity} {s.unit}</span>
                  <span className={styles.alertMin}>mín. {s.minQuantity} {s.unit}</span>
                </div>
              </div>
            ))}
          {mockStockEntries.filter((s) => s.quantity < s.minQuantity).length === 0 && (
            <p className={styles.allGood}>Todos os itens estão acima do estoque mínimo.</p>
          )}
        </div>
      </div>
    </div>
  )
}
