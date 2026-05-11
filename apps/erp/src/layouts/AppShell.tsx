import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import styles from './AppShell.module.css'

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/itens': 'Itens',
  '/estoque': 'Estoque',
  '/bom': 'Lista de Materiais (BOM)',
  '/compras': 'Compras',
  '/producao': 'Produção',
}

export function AppShell() {
  const location = useLocation()
  const title = pageTitles[location.pathname] ?? 'ERP'

  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.main}>
        <Topbar title={title} />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
