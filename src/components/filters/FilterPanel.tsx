'use client'

import { useState } from 'react'
import { ChevronDown, X, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CityFilter } from './CityFilter'
import { CategoryFilter } from './CategoryFilter'

interface FilterPanelProps {
  selectedCities: string[]
  selectedCategories: string[]
  selectedTypes: string[]
  onCitiesChange: (cities: string[]) => void
  onCategoriesChange: (categories: string[]) => void
  onTypesChange: (types: string[]) => void
  onClearAll: () => void
}

const EVENT_TYPES = [
  { value: 'ملی', label: 'ملی' },
  { value: 'مذهبی', label: 'مذهبی' },
  { value: 'هنری', label: 'هنری' },
  { value: 'فرهنگی', label: 'فرهنگی' },
  { value: 'علمی', label: 'علمی' },
  { value: 'گردشگری', label: 'گردشگری' },
  { value: 'ورزشی', label: 'ورزشی' },
]

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gray-100 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 text-sm font-bold text-gray-900"
      >
        {title}
        <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
      </button>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  )
}

export function FilterPanel({
  selectedCities,
  selectedCategories,
  selectedTypes,
  onCitiesChange,
  onCategoriesChange,
  onTypesChange,
  onClearAll,
}: FilterPanelProps) {
  const hasActiveFilters = selectedCities.length > 0 || selectedCategories.length > 0 || selectedTypes.length > 0

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 font-bold text-gray-900">
          <Filter className="w-5 h-5" />
          فیلترها
        </h3>
        {hasActiveFilters && (
          <button onClick={onClearAll} className="text-xs text-red-500 hover:text-red-700 font-medium">
            حذف همه
          </button>
        )}
      </div>

      <div className="space-y-4">
        <FilterSection title="شهر">
          <CityFilter selectedCities={selectedCities} onChange={onCitiesChange} />
        </FilterSection>

        <FilterSection title="نوع رویداد">
          <div className="space-y-1">
            {EVENT_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => {
                  if (selectedTypes.includes(type.value)) {
                    onTypesChange(selectedTypes.filter((t) => t !== type.value))
                  } else {
                    onTypesChange([...selectedTypes, type.value])
                  }
                }}
                className={cn(
                  'flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors',
                  selectedTypes.includes(type.value)
                    ? 'bg-amber-50 text-amber-700'
                    : 'hover:bg-gray-50 text-gray-700'
                )}
              >
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="موضوع" defaultOpen={false}>
          <CategoryFilter selectedCategories={selectedCategories} onChange={onCategoriesChange} />
        </FilterSection>
      </div>
    </div>
  )
}
