import type { Filter } from '@/lib/hooks/useTodos'

type TodoFilterProps = {
  value: Filter
  onChange: (filter: Filter) => void
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '미완료' },
  { value: 'completed', label: '완료' },
]

export function TodoFilter({ value, onChange }: TodoFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="할 일 필터"
      className="flex gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-900"
    >
      {FILTERS.map((item) => (
        <button
          key={item.value}
          type="button"
          role="tab"
          aria-selected={value === item.value}
          onClick={() => onChange(item.value)}
          className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            value === item.value
              ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-50'
              : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
