interface TopbarProps {
  title: string
}

export function Topbar({ title }: TopbarProps) {
  return (
    <header className="fixed top-0 right-0 left-[256px] h-14 border-b border-zinc-200 bg-white flex justify-between items-center px-6 z-40 font-sans shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-bold text-zinc-900 tracking-tight uppercase">{title}</h2>
        <div className="relative flex items-center bg-zinc-50 border border-zinc-200 px-3 py-1.5 focus-within:ring-1 focus-within:ring-zinc-400 focus-within:border-zinc-400 transition-shadow rounded-sm ml-4">
          <span className="material-symbols-outlined text-zinc-400 text-[16px] mr-2">search</span>
          <input
            className="bg-transparent border-none p-0 focus:ring-0 text-xs w-64 placeholder:text-zinc-400 outline-none"
            placeholder={`Buscar em ${title.toLowerCase()}...`}
            type="text"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 border-r border-zinc-200 pr-6">
          <button className="text-zinc-400 hover:text-zinc-900 transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
          <button className="text-zinc-400 hover:text-zinc-900 transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">history</span>
          </button>
        </div>
        <div className="flex items-center gap-3 pl-1">
          <div className="text-right">
            <p className="text-xs font-bold text-zinc-900 leading-none">Admin</p>
            <p className="text-[10px] font-medium text-zinc-500 mt-1 uppercase tracking-wider">ERP</p>
          </div>
          <div className="w-8 h-8 rounded bg-zinc-900 flex items-center justify-center text-white font-bold text-xs">
            AD
          </div>
        </div>
      </div>
    </header>
  )
}
