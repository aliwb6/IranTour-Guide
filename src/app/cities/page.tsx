// src/app/cities/page.tsx

import Link from 'next/link'
import { citiesData } from '@/lib/mock-data/cities-data'
import { mockEvents } from '@/lib/mock-data/events'

export default function CitiesPage() {
  // محاسبه تعداد رویدادها برای هر شهر
  const citiesWithEventCount = citiesData.map((city) => ({
    ...city,
    eventCount: mockEvents.filter((event) => event.city === city.name).length,
  }))

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="kashi-star-pattern py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-red-900 mb-4">🏙️ شهرهای ایران</h1>
          <p className="text-lg md:text-xl text-gray-700 font-bold max-w-2xl mx-auto">
            کشف فرهنگ، تاریخ و جاذبه‌های گردشگری شهرهای زیبای ایران
          </p>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {citiesWithEventCount.map((city) => (
              <Link
                key={city.id}
                href={`/cities/${city.slug}`}
                className="kashi-card overflow-hidden group hover:scale-105 transition duration-300"
              >
                {/* تصویر */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 right-4">
                    <h2 className="text-3xl font-black text-yellow-200 mb-1">{city.name}</h2>
                    <p className="text-yellow-100 font-bold">{city.province}</p>
                  </div>
                </div>

                {/* محتوا */}
                <div className="p-6">
                  <p className="text-gray-700 font-bold leading-relaxed mb-4 line-clamp-2">
                    {city.description}
                  </p>

                  {/* آمار */}
                  <div className="flex items-center justify-between text-sm border-t-2 border-gold pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-black text-red-900">{city.eventCount}</p>
                      <p className="text-gray-600 font-bold">رویداد</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-black text-red-900">{city.attractions.length}</p>
                      <p className="text-gray-600 font-bold">جاذبه</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-black text-red-900">{city.population}</p>
                      <p className="text-gray-600 font-bold">جمعیت</p>
                    </div>
                  </div>

                  {/* دکمه */}
                  <div className="mt-4">
                    <span className="deep-persian-btn w-full px-6 py-3 text-center font-black block">
                      مشاهده جزئیات ←
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
