import { NavLink, useMatch } from 'react-router'

function useERPBase() {
  const m = useMatch('/erp/*') ?? useMatch('/erp')
  return m?.pathnameBase ?? ''
}

export function Sidebar() {
  const base = useERPBase()

  const navItems = [
    { to: base || '/', icon: 'dashboard', label: 'Dashboard', end: true },
    { to: `${base}/itens`, icon: 'category', label: 'Itens', end: false },
    { to: `${base}/estoque`, icon: 'inventory_2', label: 'Estoque', end: false },
    { to: `${base}/bom`, icon: 'account_tree', label: 'BOM', end: false },
    { to: `${base}/compras`, icon: 'shopping_cart', label: 'Compras', end: false },
    { to: `${base}/producao`, icon: 'factory', label: 'Produção', end: false },
  ]

  return (
    <aside className="w-[256px] h-screen fixed left-0 top-0 border-r border-zinc-200 bg-white flex flex-col py-6 font-sans antialiased tracking-tight text-sm z-50 shadow-[1px_0_2px_rgba(0,0,0,0.02)]">
      <div className="px-6 mb-8 flex flex-col">
        <h1 className="text-xl font-black tracking-tighter text-zinc-950 uppercase">Supexon</h1>
        <p className="text-[10px] text-zinc-500 font-semibold tracking-wider uppercase mt-1">ERP — v0.1</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 transition-all ${
                isActive
                  ? 'text-zinc-950 font-bold border-l-4 border-zinc-950 bg-zinc-100'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 border-l-4 border-transparent'
              }`
            }
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-6 mt-auto">
        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-zinc-400">
          <span className="text-[10px] font-medium uppercase tracking-widest">Sistema Operacional</span>
        </div>
      </div>
    </aside>
  )
}
