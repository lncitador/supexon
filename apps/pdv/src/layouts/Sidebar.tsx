import { NavLink } from 'react-router'

interface NavItem {
  to: string
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { to: '/', icon: 'point_of_sale', label: 'Venda' },
  { to: '/produtos', icon: 'inventory_2', label: 'Produtos' },
  { to: '/clientes', icon: 'group', label: 'Clientes' },
  { to: '/vendas-recentes', icon: 'receipt_long', label: 'Vendas Recentes' },
  { to: '/caixa', icon: 'account_balance_wallet', label: 'Caixa' },
  { to: '/configuracoes', icon: 'settings', label: 'Configurações' },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`h-screen fixed left-0 top-0 border-r border-zinc-200 bg-white flex flex-col py-6 font-sans antialiased tracking-tight text-sm z-50 shadow-[1px_0_2px_rgba(0,0,0,0.02)] transition-all duration-200 ${
        collapsed ? 'w-[64px]' : 'w-[256px]'
      }`}
    >
      <div className={`mb-8 flex items-center ${collapsed ? 'justify-center px-0' : 'px-6 justify-between'}`}>
        {!collapsed && (
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tighter text-zinc-950 uppercase">Supexon</h1>
            <p className="text-[10px] text-zinc-500 font-semibold tracking-wider uppercase mt-1">PDV — v0.1</p>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-sm text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
          title={collapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          <span className="material-symbols-outlined text-[20px]">
            {collapsed ? 'chevron_right' : 'chevron_left'}
          </span>
        </button>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            title={collapsed ? item.label : undefined}
            className={({ isActive }) =>
              `flex items-center py-3 transition-all ${
                collapsed ? 'justify-center px-0' : 'px-6'
              } ${
                isActive
                  ? 'text-zinc-950 font-bold border-l-4 border-zinc-950 bg-zinc-100'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 border-l-4 border-transparent'
              }`
            }
          >
            <span className={`material-symbols-outlined text-[20px] ${collapsed ? '' : 'mr-3'}`}>{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {!collapsed && (
        <div className="px-6 mt-auto">
          <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-zinc-400">
            <span className="text-[10px] font-medium uppercase tracking-widest">Ponto de Venda</span>
          </div>
        </div>
      )}
    </aside>
  )
}
