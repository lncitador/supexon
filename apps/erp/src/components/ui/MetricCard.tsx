import styles from './MetricCard.module.css'

interface MetricCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  accent?: 'default' | 'warning' | 'danger' | 'success'
}

export function MetricCard({ label, value, icon, accent = 'default' }: MetricCardProps) {
  return (
    <div className={`${styles.card} ${styles[accent]}`}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.content}>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  )
}
