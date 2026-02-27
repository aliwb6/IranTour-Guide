'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, Grid3X3, List } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EventFiltersProps {
  searchValue: string
  onSearchChange: (value: string) => void
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  totalCount: number
  onFilterToggle?: () => void
}

export function EventFilters({
  searchValue,
  onSearchChange,
  viewMode,
  onViewModeChange,
  totalCount,
  onFilterToggle,
}: EventFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-80">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="جستجوی رویداد..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
          />
        </div>
        {onFilterToggle && (
          <button
            onClick={onFilterToggle}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 border rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <SlidersHorizontal className="w-4 h-4" />
            فیلتر
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">{totalCount} رویداد</span>
        <div className="flex items-center border rounded-lg overflow-hidden">
          <button
            onClick={() => onViewModeChange('grid')}
            className={cn(
              'p-2 transition-colors',
              viewMode === 'grid' ? 'bg-amber-100 text-amber-700' : 'text-gray-400 hover:text-gray-600'
            )}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={cn(
              'p-2 transition-colors',
              viewMode === 'list' ? 'bg-amber-100 text-amber-700' : 'text-gray-400 hover:text-gray-600'
            )}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
