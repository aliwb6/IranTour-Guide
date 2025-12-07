// src/app/events/page.tsx
'use client'

import { useState, useMemo } from 'react'
import { mockEvents } from '@/lib/mock-data/events'
import EventCard from '@/components/events/EventCard'
import FilterPanel from '@/components/events/FilterPanel'
import Pagination from '@/components/shared/Pagination'

export default function EventsPage() {
  const [selectedCity, setSelectedCity] = useState('همه شهرها')
  const [selectedType, setSelectedType] = useState('همه')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 9

  const filteredEvents = useMemo(() => {
    return mockEvents.filter((event) => {
      const cityMatch = selectedCity === 'همه شهرها' || event.city === selectedCity
      const typeMatch = selectedType === 'همه' || event.type === selectedType
      return cityMatch && typeMatch
    })
  }, [selectedCity, selectedType])

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEvents = filteredEvents.slice(startIndex, endIndex)

  const handleClearFilters = () => {
    setSelectedCity('همه شهرها')
    setSelectedType('همه')
    setCurrentPage(1)
  }

  const handleCityChange = (city: string) => {
    setSelectedCity(city)
    setCurrentPage(1)
  }

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
    setCurrentPage(1)
  }

  const activeFilters = [
    selectedCity !== 'همه شهرها' && selectedCity,
    selectedType !== 'همه' && selectedType,
  ].filter(Boolean)

  return (
    <div className="min-h-screen bg-cream">
      <section className="kashi-star-pattern py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-red-900 mb-4">
            🎭 رویدادهای ایران
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-bold max-w-2xl mx-auto">
            کشف و تجربه بهترین رویدادهای فرهنگی، هنری و گردشگری ایران
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <FilterPanel
              selectedCity={selectedCity}
              selectedType={selectedType}
              onCityChange={handleCityChange}
              onTypeChange={handleTypeChange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          <main className="lg:col-span-3">
               {activeFilters.map((filter, index) => (
                  <span key={index} className="kashi-badge px-4 py-2 text-sm">
                    {filter}
                  </span>
                ))}
                ))}
              </div>
            )}

            <div className="mb-6">
              <p className="text-gray-700 font-bold">
                {filteredEvents.length} رویداد یافت شد
              </p>
            </div>

            {currentEvents.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className="text-center kashi-card p-12">
                <p className="text-6xl mb-4">😔</p>
                <p className="text-2xl font-black text-red-900 mb-4">
                  رویدادی یافت نشد
                </p>
                <button
                  onClick={handleClearFilters}
                  className="deep-persian-btn px-8 py-3 font-black"
                >
                  پاک کردن فیلترها
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
