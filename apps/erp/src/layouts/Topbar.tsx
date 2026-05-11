import styles from './Topbar.module.css'

interface TopbarProps {
  title: string
}

export function Topbar({ title }: TopbarProps) {
  return (
    <header className={styles.topbar}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.actions}>
        <span className={styles.user}>Admin</span>
      </div>
    </header>
  )
}
