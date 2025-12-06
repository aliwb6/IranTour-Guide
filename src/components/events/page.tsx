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

  // فیلتر کردن رویدادها
  const filteredEvents = useMemo(() => {
    return mockEvents.filter((event) => {
      const cityMatch = selectedCity === 'همه شهرها' || event.city === selectedCity
      const typeMatch = selectedType === 'همه' || event.type === selectedType
      return cityMatch && typeMatch
    })
  }, [selectedCity, selectedType])

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEvents = filteredEvents.slice(startIndex, endIndex)

  // پاک کردن فیلترها
  const handleClearFilters = () => {
    setSelectedCity('همه شهرها')
    setSelectedType('همه')
    setCurrentPage(1)
  }

  // تغییر صفحه - اسکرول به بالا
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // تغییر فیلتر - ریست صفحه
  const handleCityChange = (city: string) => {
    setSelectedCity(city)
    setCurrentPage(1)
  }

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="kashi-star-pattern py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-yellow-200 text-center mb-4 drop-shadow-lg">
            🎭 همه رویدادهای ایران
          </h1>
          <p className="text-lg md:text-xl text-yellow-100 text-center max-w-3xl mx-auto leading-relaxed">
            کشف کنید، تجربه کنید، لذت ببرید از بهترین رویدادهای فرهنگی و هنری
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar فیلترها - Desktop */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-4">
              <FilterPanel
                selectedCity={selectedCity}
                selectedType={selectedType}
                onCityChange={handleCityChange}
                onTypeChange={handleTypeChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </aside>

          {/* محتوای اصلی */}
          <div className="lg:col-span-3">
            {/* Mobile: دکمه فیلتر */}
            <div className="lg:hidden mb-6">
              <button className="deep-persian-btn w-full px-6 py-3 text-center font-black">
                🔍 فیلترها ({filteredEvents.length} رویداد)
              </button>
            </div>

            {/* نمایش تعداد نتایج */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-700 font-bold text-lg">
                {filteredEvents.length} رویداد پیدا شد
              </p>
              <p className="text-sm text-gray-600">
                صفحه {currentPage} از {totalPages}
              </p>
            </div>

            {/* فیلترهای فعال */}
            {(selectedCity !== 'همه شهرها' || selectedType !== 'همه') && (
              <div className="mb-6 flex flex-wrap gap-2 items-center">
                <span className="text-sm font-bold text-gray-700">فیلترهای فعال:</span>
                {selectedCity !== 'همه شهرها' && (
                  <button
                    onClick={() => handleCityChange('همه شهرها')}
                    className="kashi-badge text-xs px-3 py-1.5 flex items-center gap-2 hover:bg-red-900 hover:text-yellow-200 transition"
                  >
                    📍 {selectedCity}
                    <span className="font-black">×</span>
                  </button>
                )}
                {selectedType !== 'همه' && (
                  <button
                    onClick={() => handleTypeChange('همه')}
                    className="kashi-badge text-xs px-3 py-1.5 flex items-center gap-2 hover:bg-red-900 hover:text-yellow-200 transition"
                  >
                    🎭 {selectedType}
                    <span className="font-black">×</span>
                  </button>
                )}
              </div>
            )}

            {/* Grid رویدادها */}
            {currentEvents.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              // حالت خالی
              <div className="text-center py-16 kashi-card">
                <p className="text-6xl mb-4">😔</p>
                <p className="text-xl font-black text-gray-700 mb-2">
                  رویدادی پیدا نشد
                </p>
                <p className="text-gray-600 mb-6">
                  متأسفانه با این فیلترها رویدادی یافت نشد. لطفاً فیلترهای دیگری را امتحان کنید.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="deep-persian-btn px-8 py-3 font-black"
                >
                  پاک کردن فیلترها
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
