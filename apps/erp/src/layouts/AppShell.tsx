import { Outlet, useLocation } from 'react-router'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

const pageTitles: Record<string, string> = {
  '': 'Dashboard',
  'erp': 'Dashboard',
  'itens': 'Cadastro de Itens',
  'estoque': 'Controle de Estoque',
  'bom': 'Lista de Materiais (BOM)',
  'compras': 'Pedidos de Compra',
  'producao': 'Ordens de Produção',
}

export function AppShell() {
  const location = useLocation()
  const segment = location.pathname.split('/').filter(Boolean).pop() ?? ''
  const title = pageTitles[segment] ?? 'ERP'

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50/30">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 pl-[256px]">
        <Topbar title={title} />
        <main className="flex-1 overflow-auto px-4 md:px-6 pb-4 md:pb-6 pt-20">
          <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
