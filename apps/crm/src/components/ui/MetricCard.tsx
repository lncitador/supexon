interface MetricCardProps {
  label: string
  value: string | number
  icon?: string
  accent?: 'default' | 'warning' | 'danger' | 'success'
}

export function MetricCard({ label, value, icon, accent = 'default' }: MetricCardProps) {
  const accentClasses = {
    default: 'text-zinc-950 border-zinc-200',
    warning: 'text-amber-600 border-amber-200 bg-amber-50/30',
    danger: 'text-red-600 border-red-200 bg-red-50/30',
    success: 'text-teal-600 border-teal-200 bg-teal-50/30',
  }

  const iconColor = {
    default: 'text-zinc-950 bg-zinc-100',
    warning: 'text-amber-600 bg-amber-100',
    danger: 'text-red-600 bg-red-100',
    success: 'text-teal-600 bg-teal-100',
  }

  return (
    <div className={`bg-white border shadow-sm p-5 rounded-sm flex flex-col justify-between hover:shadow-md transition-shadow group ${accentClasses[accent]}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
          <h2 className="text-3xl font-black tracking-tight">{value}</h2>
        </div>
        {icon && (
          <div className={`p-2 rounded-sm flex items-center justify-center ${iconColor[accent]}`}>
            <span className="material-symbols-outlined text-[20px]">{icon}</span>
          </div>
        )}
      </div>
    </div>
  )
}
