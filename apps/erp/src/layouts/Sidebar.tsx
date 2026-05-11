import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'

interface NavItem {
  to: string
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { to: '/', icon: '◼', label: 'Dashboard' },
  { to: '/itens', icon: '▤', label: 'Itens' },
  { to: '/estoque', icon: '▦', label: 'Estoque' },
  { to: '/bom', icon: '⊞', label: 'BOM' },
  { to: '/compras', icon: '◈', label: 'Compras' },
  { to: '/producao', icon: '⚙', label: 'Produção' },
]

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.brandMark}>S</span>
        <span className={styles.brandName}>Supexon</span>
      </div>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className={styles.footer}>
        <span className={styles.version}>ERP v0.1</span>
      </div>
    </aside>
  )
}
