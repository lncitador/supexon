interface TopbarProps {
  title: string
}

export function Topbar({ title }: TopbarProps) {
  return (
    <header className="h-16 fixed top-0 right-0 left-[256px] bg-white border-b border-zinc-200 z-40 flex items-center justify-between px-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <h2 className="text-sm font-bold text-zinc-950 tracking-tight">{title}</h2>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span className="material-symbols-outlined text-[16px] text-teal-500">circle</span>
          <span className="font-medium">Caixa Aberto</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-600">
          <span className="material-symbols-outlined text-[18px]">person</span>
          <span className="font-semibold">João Operador</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-sm px-3 py-1.5">
          <span className="material-symbols-outlined text-[16px]">storefront</span>
          <span className="font-medium">Loja Principal</span>
        </div>
      </div>
    </header>
  )
}
