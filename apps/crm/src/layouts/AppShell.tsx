import { Outlet, useLocation } from 'react-router'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/clientes': 'Clientes',
  '/pipeline': 'Pipeline',
  '/oportunidades': 'Oportunidades',
  '/propostas': 'Propostas',
  '/historico': 'Histórico de Vendas',
}

export function AppShell() {
  const location = useLocation()
  const title = pageTitles[location.pathname] ?? 'CRM'

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50/30">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 pl-[256px]">
        <Topbar title={title} />
        <main className="flex-1 overflow-auto p-page-padding pt-20">
          <div className="max-w-7xl mx-auto space-y-section-gap">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
