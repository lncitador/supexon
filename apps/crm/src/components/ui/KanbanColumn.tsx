import type { ReactNode } from 'react'

interface KanbanColumnProps {
  title: string
  count: number
  colorClass: string
  children: ReactNode
}

export function KanbanColumn({ title, count, colorClass, children }: KanbanColumnProps) {
  return (
    <div className="flex flex-col min-w-[240px] w-[240px] bg-zinc-50 border border-zinc-200 rounded-sm">
      <div className="px-4 py-3 border-b border-zinc-200 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-700">{title}</span>
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${colorClass}`}>
          {count}
        </span>
      </div>
      <div className="flex-1 p-3 space-y-3 overflow-y-auto max-h-[calc(100vh-240px)]">
        {children}
      </div>
    </div>
  )
}
