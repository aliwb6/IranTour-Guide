'use client'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { CATEGORIES } from '@/config/categories'

interface CategoryFilterProps {
  selectedCategories: string[]
  onChange: (categories: string[]) => void
}

export function CategoryFilter({ selectedCategories, onChange }: CategoryFilterProps) {
  const toggleCategory = (slug: string) => {
    if (selectedCategories.includes(slug)) {
      onChange(selectedCategories.filter((c) => c !== slug))
    } else {
      onChange([...selectedCategories, slug])
    }
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {CATEGORIES.map((category) => {
        const isSelected = selectedCategories.includes(category.slug)
        return (
          <button
            key={category.slug}
            onClick={() => toggleCategory(category.slug)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors border',
              isSelected
                ? 'border-amber-500 bg-amber-50 text-amber-700'
                : 'border-gray-200 hover:border-gray-300 text-gray-600'
            )}
          >
            <span>{category.icon}</span>
            <span className="truncate">{category.name}</span>
            {isSelected && <Check className="w-3 h-3 text-amber-600 shrink-0" />}
          </button>
        )
      })}
    </div>
  )
}
