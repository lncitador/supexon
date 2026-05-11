import { useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

const pageTitles: Record<string, string> = {
  '': 'Venda',
  'pdv': 'Venda',
  'produtos': 'Produtos',
  'clientes': 'Clientes',
  'vendas-recentes': 'Vendas Recentes',
  'caixa': 'Caixa',
  'configuracoes': 'Configurações',
}

export function AppShell() {
  const location = useLocation()
  const segment = location.pathname.split('/').filter(Boolean).pop() ?? ''
  const title = pageTitles[segment] ?? 'PDV'
  const isVenda = segment === '' || segment === 'pdv'
  const [collapsed, setCollapsed] = useState(false)
  const sidebarWidth = collapsed ? 64 : 256

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50/30">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-200" style={{ paddingLeft: sidebarWidth }}>
        <Topbar title={title} />
        {isVenda ? (
          <main className="flex-1 overflow-hidden pt-16">
            <Outlet />
          </main>
        ) : (
          <main className="flex-1 overflow-auto px-4 py-4 md:px-6 md:py-6 pt-20">
            <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
              <Outlet />
            </div>
          </main>
        )}
      </div>
    </div>
  )
}
