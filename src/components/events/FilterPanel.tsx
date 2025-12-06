// src/components/events/FilterPanel.tsx
'use client'

import { iranCities } from '@/lib/mock-data/cities'

interface FilterPanelProps {
  selectedCity: string
  selectedType: string
  onCityChange: (city: string) => void
  onTypeChange: (type: string) => void
  onClearFilters: () => void
}

export default function FilterPanel({
  selectedCity,
  selectedType,
  onCityChange,
  onTypeChange,
  onClearFilters,
}: FilterPanelProps) {
  const eventTypes = ['همه', 'ملی', 'مذهبی', 'هنری', 'علمی', 'گردشگری', 'فرهنگی']

  return (
    <div className="kashi-card p-6 space-y-6">
      {/* عنوان */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-red-900">🔍 فیلترها</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-red-700 hover:text-red-900 font-bold transition"
        >
          پاک کردن همه
        </button>
      </div>

      {/* فیلتر شهر */}
      <div>
        <h4 className="font-black text-red-900 mb-3 text-base">📍 شهر</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
          {iranCities.map((city) => (
            <label
              key={city}
              className="flex items-center gap-2 cursor-pointer hover:bg-cream/50 p-2 rounded-lg transition"
            >
              <input
                type="radio"
                name="city"
                value={city}
                checked={selectedCity === city}
                onChange={(e) => onCityChange(e.target.value)}
                className="w-4 h-4 accent-persian-red cursor-pointer"
              />
              <span className="text-sm font-bold text-gray-800">{city}</span>
            </label>
          ))}
        </div>
      </div>

      {/* فیلتر نوع */}
      <div>
        <h4 className="font-black text-red-900 mb-3 text-base">🎭 نوع رویداد</h4>
        <div className="space-y-2">
          {eventTypes.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 cursor-pointer hover:bg-cream/50 p-2 rounded-lg transition"
            >
              <input
                type="radio"
                name="type"
                value={type}
                checked={selectedType === type}
                onChange={(e) => onTypeChange(e.target.value)}
                className="w-4 h-4 accent-persian-red cursor-pointer"
              />
              <span className="text-sm font-bold text-gray-800">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
