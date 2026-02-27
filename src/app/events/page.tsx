'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { mockEvents } from '@/lib/mock-data/events'
import EventCard from '@/components/events/EventCard'
import FilterPanel from '@/components/events/FilterPanel'
import Pagination from '@/components/shared/Pagination'
import { Search, SlidersHorizontal, X } from 'lucide-react'

export default function EventsPage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ''

  const [selectedCity, setSelectedCity] = useState('همه شهرها')
  const [selectedType, setSelectedType] = useState('همه')
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [currentPage, setCurrentPage] = useState(1)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const itemsPerPage = 9

  const filteredEvents = useMemo(() => {
    return mockEvents.filter((event) => {
      const cityMatch = selectedCity === 'همه شهرها' || event.city === selectedCity
      const typeMatch = selectedType === 'همه' || event.type === selectedType
      const searchMatch = !searchQuery || 
        event.title.includes(searchQuery) ||
        event.shortDescription.includes(searchQuery) ||
        event.city.includes(searchQuery) ||
        event.type.includes(searchQuery)
      return cityMatch && typeMatch && searchMatch
    })
  }, [selectedCity, selectedType, searchQuery])

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage)

  const activeFilters: string[] = [
    selectedCity !== 'همه شهرها' ? selectedCity : '',
    selectedType !== 'همه' ? selectedType : '',
    searchQuery ? `جستجو: ${searchQuery}` : '',
  ].filter(Boolean)

  const handleClearFilters = () => {
    setSelectedCity('همه شهرها')
    setSelectedType('همه')
    setSearchQuery('')
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-cream">
      <section className="kashi-star-pattern py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-yellow-100 mb-4 drop-shadow-lg">
            🎭 رویدادهای ایران
          </h1>
          <p className="text-lg md:text-xl text-yellow-50 font-bold max-w-2xl mx-auto drop-shadow">
            کشف و تجربه بهترین رویدادهای فرهنگی، هنری و گردشگری ایران
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="hidden lg:block">
              <FilterPanel
                selectedCity={selectedCity}
                selectedType={selectedType}
                onCityChange={(city) => { setSelectedCity(city); setCurrentPage(1) }}
                onTypeChange={(type) => { setSelectedType(type); setCurrentPage(1) }}
                onClearFilters={handleClearFilters}
              />
            </div>
          </aside>

          <main className="lg:col-span-3">
            {/* Search Bar */}
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
                  placeholder="جستجوی رویداد..."
                  className="w-full pr-12 pl-4 py-3 rounded-xl border-2 border-gold focus:border-red-900 focus:outline-none font-bold"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden px-4 py-3 rounded-xl border-2 border-gold text-red-900 font-bold hover:bg-gold hover:text-white transition"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Filters */}
            {showMobileFilters && (
              <div className="lg:hidden mb-6">
                <FilterPanel
                  selectedCity={selectedCity}
                  selectedType={selectedType}
                  onCityChange={(city) => { setSelectedCity(city); setCurrentPage(1) }}
                  onTypeChange={(type) => { setSelectedType(type); setCurrentPage(1) }}
                  onClearFilters={handleClearFilters}
                />
              </div>
            )}

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="font-black text-red-900">فیلترهای فعال:</span>
                {activeFilters.map((filter, index) => (
                  <span key={index} className="kashi-badge px-4 py-2 text-sm">{filter}</span>
                ))}
                <button onClick={handleClearFilters} className="text-sm text-red-500 hover:text-red-700 font-bold mr-2">
                  حذف همه
                </button>
              </div>
            )}

            <div className="mb-6">
              <p className="text-gray-700 font-bold">{filteredEvents.length} رویداد یافت شد</p>
            </div>

            {currentEvents.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {currentEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                )}
              </>
            ) : (
              <div className="text-center kashi-card p-12">
                <p className="text-6xl mb-4">😔</p>
                <p className="text-2xl font-black text-red-900 mb-4">رویدادی یافت نشد</p>
                <p className="text-gray-700 font-bold mb-6">لطفاً فیلترهای خود را تغییر دهید</p>
                <button onClick={handleClearFilters} className="deep-persian-btn px-8 py-3 font-black">
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
