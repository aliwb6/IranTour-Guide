'use client'

import { useState } from 'react'
import { MapPin, ZoomIn, ZoomOut, Locate } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CITIES } from '@/config/cities'

interface MapEvent {
  id: string
  title: string
  city: string
  latitude?: number
  longitude?: number
}

interface InteractiveMapProps {
  events?: MapEvent[]
  onCitySelect?: (city: string) => void
  selectedCity?: string | null
}

export function InteractiveMap({ events = [], onCitySelect, selectedCity }: InteractiveMapProps) {
  const [zoom, setZoom] = useState(5)

  const citiesWithEvents = CITIES.map((city) => ({
    ...city,
    eventCount: events.filter((e) => e.city === city.name).length,
  })).filter((c) => c.eventCount > 0 || !events.length)

  return (
    <div className="relative w-full h-full min-h-[400px] bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-gray-200 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4 p-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 flex items-center justify-center">
            <MapPin className="w-10 h-10 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">نقشه تعاملی ایران</h3>
          <p className="text-sm text-gray-500 max-w-md">
            برای نمایش نقشه تعاملی، توکن Mapbox در تنظیمات سرور تعریف شود
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-6 max-w-2xl mx-auto">
            {citiesWithEvents.slice(0, 12).map((city) => (
              <button
                key={city.slug}
                onClick={() => onCitySelect?.(city.name)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors border',
                  selectedCity === city.name
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-gray-200 hover:border-amber-300 text-gray-700'
                )}
              >
                <MapPin className="w-3 h-3 shrink-0" />
                <span>{city.name}</span>
                {city.eventCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
                    {city.eventCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        <button
          onClick={() => setZoom((z) => Math.min(z + 1, 18))}
          className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z - 1, 1))}
          className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors">
          <Locate className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
