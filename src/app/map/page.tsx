// src/app/map/page.tsx
'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { citiesData } from '@/lib/mock-data/cities-data'
import { mockEvents } from '@/lib/mock-data/events'
import { formatGregorianDate, formatPersianDate, parseJalaliDate } from '@/lib/date-utils'

export default function MapPage() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [rangeStart, setRangeStart] = useState('')
  const [rangeEnd, setRangeEnd] = useState('')

  const rangeStartDate = rangeStart ? new Date(rangeStart) : null
  const rangeEndDate = rangeEnd ? new Date(rangeEnd) : null

  const filteredEvents = useMemo(() => {
    if (!rangeStartDate && !rangeEndDate) {
      return mockEvents
    }

    return mockEvents.filter((event) => {
      const eventStart = parseJalaliDate(event.startDate)
      const eventEnd = parseJalaliDate(event.endDate)
      if (!eventStart || !eventEnd) {
        return false
      }

      const rangeStartValue = rangeStartDate ? rangeStartDate.getTime() : -Infinity
      const rangeEndValue = rangeEndDate ? rangeEndDate.getTime() : Infinity

      return eventStart.getTime() <= rangeEndValue && eventEnd.getTime() >= rangeStartValue
    })
  }, [rangeEndDate, rangeStartDate])

  // محاسبه تعداد رویدادها برای هر شهر
  const citiesWithEvents = citiesData.map((city) => ({
    ...city,
    eventCount: filteredEvents.filter((event) => event.city === city.name).length,
  }))

  const selectedCityData = selectedCity
    ? citiesWithEvents.find((c) => c.slug === selectedCity)
    : null

  const selectedCityEvents = selectedCityData
    ? filteredEvents.filter((event) => event.city === selectedCityData.name)
    : []

  const formatDateWithGregorian = (dateString: string) => {
    const gregorianDate = parseJalaliDate(dateString)
    if (!gregorianDate) {
      return dateString
    }
    return `${dateString} / ${formatGregorianDate(gregorianDate)}`
  }

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
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-2xl font-black text-red-900 mb-2">
                    شهرهای ایران
                  </h2>
                  <p className="text-sm text-gray-600 font-bold mb-4">
                    💡 در نسخه آینده، نقشه تعاملی Mapbox/Leaflet اضافه خواهد شد
                  </p>
                </div>
                <div className="w-full md:max-w-xs space-y-3">
                  <label className="block text-right">
                    <span className="text-xs font-bold text-gray-700">
                      تاریخ شروع (میلادی)
                    </span>
                    <input
                      type="date"
                      value={rangeStart}
                      onChange={(event) => setRangeStart(event.target.value)}
                      className="mt-2 w-full rounded-xl border-2 border-gray-300 px-3 py-2 text-right font-bold"
                    />
                    <span className="mt-1 block text-[11px] font-bold text-gray-500">
                      شمسی: {rangeStartDate ? formatPersianDate(rangeStartDate) : '—'}
                    </span>
                  </label>
                  <label className="block text-right">
                    <span className="text-xs font-bold text-gray-700">
                      تاریخ پایان (میلادی)
                    </span>
                    <input
                      type="date"
                      value={rangeEnd}
                      onChange={(event) => setRangeEnd(event.target.value)}
                      className="mt-2 w-full rounded-xl border-2 border-gray-300 px-3 py-2 text-right font-bold"
                    />
                    <span className="mt-1 block text-[11px] font-bold text-gray-500">
                      شمسی: {rangeEndDate ? formatPersianDate(rangeEndDate) : '—'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-gold/50 bg-cream px-3 py-2 text-xs font-bold text-gray-600">
                بازه انتخابی (شمسی / میلادی):{' '}
                {rangeStartDate ? formatPersianDate(rangeStartDate) : '—'} /{' '}
                {rangeStart || '—'} تا {rangeEndDate ? formatPersianDate(rangeEndDate) : '—'} /{' '}
                {rangeEnd || '—'}
              </div>

              {/* Grid شهرها */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
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
                          📅 {formatDateWithGregorian(event.startDate)}
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
