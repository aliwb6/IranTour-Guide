'use client'

import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ActiveFiltersProps {
  filters: { key: string; label: string; value: string }[]
  onRemove: (key: string, value: string) => void
  onClearAll: () => void
  className?: string
}

export function ActiveFilters({ filters, onRemove, onClearAll, className }: ActiveFiltersProps) {
  if (filters.length === 0) return null

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <span className="text-sm font-bold text-gray-700">فیلترهای فعال:</span>
      {filters.map((filter, index) => (
        <span
          key={`${filter.key}-${filter.value}-${index}`}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm font-medium border border-amber-200"
        >
          {filter.label}
          <button
            onClick={() => onRemove(filter.key, filter.value)}
            className="p-0.5 rounded-full hover:bg-amber-200 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <button
        onClick={onClearAll}
        className="text-sm text-red-500 hover:text-red-700 font-bold transition-colors"
      >
        حذف همه
      </button>
    </div>
  )
}
