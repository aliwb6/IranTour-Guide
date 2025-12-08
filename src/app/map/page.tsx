// src/app/map/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { citiesData } from '@/lib/mock-data/cities-data'
import { mockEvents } from '@/lib/mock-data/events'

export default function MapPage() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  // محاسبه تعداد رویدادها برای هر شهر
  const citiesWithEvents = citiesData.map((city) => ({
    ...city,
    eventCount: mockEvents.filter((event) => event.city === city.name).length,
  }))

  const selectedCityData = selectedCity
    ? citiesWithEvents.find((c) => c.slug === selectedCity)
    : null

  const selectedCityEvents = selectedCityData
    ? mockEvents.filter((event) => event.city === selectedCityData.name)
    : []

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="kashi-star-pattern py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-red-900 mb-6">
            🗺️ نقشه رویدادها
          </h1>
          <p className="text-xl text-gray-700 font-bold">
            رویدادهای فرهنگی ایران را روی نقشه کشف کنید
          </p>
        </div>
      </section>

      {/* محتوا */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* نقشه (فعلاً لیست شهرها) */}
          <div className="lg:col-span-2">
            <div className="kashi-card p-6">
              <h2 className="text-2xl font-black text-red-900 mb-4">
                شهرهای ایران
              </h2>
              <p className="text-sm text-gray-600 font-bold mb-6">
                💡 در نسخه آینده، نقشه تعاملی Mapbox/Leaflet اضافه خواهد شد
              </p>

              {/* Grid شهرها */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {citiesWithEvents.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => setSelectedCity(city.slug)}
                    className={`p-4 rounded-xl border-2 transition text-right ${
                      selectedCity === city.slug
                        ? 'border-red-900 bg-red-900 text-yellow-200'
                        : 'border-gold hover:bg-gold hover:text-white'
                    }`}
                  >
                    <div className="font-black text-lg mb-1">
                      📍 {city.name}
                    </div>
                    <div className="text-sm font-bold">
                      {city.eventCount} رویداد
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - رویدادهای شهر انتخابی */}
          <div className="lg:col-span-1">
            <div className="kashi-card p-6 sticky top-4">
              <h3 className="text-xl font-black text-red-900 mb-6">
                {selectedCityData
                  ? `رویدادهای ${selectedCityData.name}`
                  : 'شهری را انتخاب کنید'}
              </h3>

              {!selectedCityData && (
                <p className="text-center text-gray-600 font-bold py-8">
                  روی یک شهر کلیک کنید تا رویدادهای آن را ببینید
                </p>
              )}

              {selectedCityData && selectedCityEvents.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-600 font-bold mb-4">
                    رویدادی برای این شهر ثبت نشده است
                  </p>
                  <Link
                    href={`/cities/${selectedCityData.slug}`}
                    className="deep-persian-btn px-6 py-3 font-black inline-block"
                  >
                    مشاهده جزئیات شهر ←
                  </Link>
                </div>
              )}

              {selectedCityData && selectedCityEvents.length > 0 && (
                <>
                  <div className="space-y-4 mb-6">
                    {selectedCityEvents.slice(0, 5).map((event) => (
                      <Link
                        key={event.id}
                        href={`/events/${event.slug}`}
                        className="block p-4 rounded-xl bg-cream border-2 border-gold hover:border-red-900 transition"
                      >
                        <h4 className="font-black text-red-900 mb-2">
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-700 font-bold">
                          📅 {event.startDate}
                        </p>
                        <p className="text-sm text-gray-700 font-bold">
                          🏷️ {event.type}
                        </p>
                      </Link>
                    ))}
                  </div>

                  <Link
                    href={`/events?city=${selectedCityData.name}`}
                    className="deep-persian-btn w-full px-6 py-3 text-center font-black block"
                  >
                    همه رویدادهای {selectedCityData.name} ←
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
