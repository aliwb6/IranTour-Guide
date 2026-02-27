'use client'

import { useState, useMemo } from 'react'
import { Search, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CITIES } from '@/config/cities'

interface CityFilterProps {
  selectedCities: string[]
  onChange: (cities: string[]) => void
}

export function CityFilter({ selectedCities, onChange }: CityFilterProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCities = useMemo(() => {
    if (!searchTerm) return CITIES
    return CITIES.filter(
      (city) =>
        city.name.includes(searchTerm) ||
        city.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  const toggleCity = (cityName: string) => {
    if (selectedCities.includes(cityName)) {
      onChange(selectedCities.filter((c) => c !== cityName))
    } else {
      onChange([...selectedCities, cityName])
    }
  }

  const selectAll = () => onChange(CITIES.map((c) => c.name))
  const deselectAll = () => onChange([])

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="جستجوی شهر..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pr-10 pl-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
        />
      </div>

      <div className="flex items-center justify-between text-xs">
        <button onClick={selectAll} className="text-amber-600 hover:underline font-medium">
          انتخاب همه
        </button>
        <button onClick={deselectAll} className="text-gray-500 hover:underline font-medium">
          حذف همه
        </button>
      </div>

      <div className="max-h-60 overflow-y-auto space-y-1 custom-scrollbar">
        {filteredCities.map((city) => {
          const isSelected = selectedCities.includes(city.name)
          return (
            <button
              key={city.slug}
              onClick={() => toggleCity(city.name)}
              className={cn(
                'flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors',
                isSelected ? 'bg-amber-50 text-amber-700' : 'hover:bg-gray-50 text-gray-700'
              )}
            >
              <span className="font-medium">{city.name}</span>
              {isSelected && <Check className="w-4 h-4 text-amber-600" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
