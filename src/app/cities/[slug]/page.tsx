// src/app/cities/[slug]/page.tsx

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { citiesData } from '@/lib/mock-data/cities-data'
import { mockEvents } from '@/lib/mock-data/events'
import EventCard from '@/components/events/EventCard'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CityDetailPage({ params }: PageProps) {
  const { slug } = await params
  const city = citiesData.find((c) => c.slug === slug)

  if (!city) {
    notFound()
  }

  // رویدادهای این شهر
  const cityEvents = mockEvents.filter((event) => event.city === city.name)

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={city.image} alt={city.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>

        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-12 w-full">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm text-yellow-200">
                <Link href="/" className="hover:text-yellow-100 transition">
                  خانه
                </Link>
                <span>›</span>
                <Link href="/cities" className="hover:text-yellow-100 transition">
                  شهرها
                </Link>
                <span>›</span>
                <span className="text-yellow-100 font-bold">{city.name}</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-yellow-200 mb-4">
              {city.name}
            </h1>
            <p className="text-xl text-yellow-100 font-bold">{city.province}</p>
          </div>
        </div>
      </section>

      {/* محتوای اصلی */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ستون اصلی */}
          <div className="lg:col-span-2 space-y-8">
            {/* درباره شهر */}
            <section className="kashi-card p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-black text-red-900 mb-6">
                📝 درباره {city.name}
              </h2>
              <p className="text-gray-700 leading-relaxed font-bold text-lg">
                {city.description}
              </p>
            </section>

            {/* جاذبه‌های گردشگری */}
            <section className="kashi-card p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-black text-red-900 mb-6">
                🏛️ جاذبه‌های گردشگری
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {city.attractions.map((attraction, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-cream rounded-xl border-2 border-gold"
                  >
                    <span className="text-2xl">📍</span>
                    <span className="font-black text-gray-800">{attraction}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* رویدادهای شهر */}
            {cityEvents.length > 0 && (
              <section className="kashi-card p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl md:text-3xl font-black text-red-900">
                    🎭 رویدادهای {city.name}
                  </h2>
                  <Link
                    href={`/events?city=${city.name}`}
                    className="text-red-900 hover:text-red-700 font-black transition"
                  >
                    همه رویدادها ←
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cityEvents.slice(0, 4).map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* اطلاعات کلیدی */}
              <div className="kashi-card p-6">
                <h3 className="text-xl font-black text-red-900 mb-6">
                  اطلاعات کلیدی
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1 font-bold">👥 جمعیت</p>
                    <p className="text-lg font-black text-gray-800">{city.population}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1 font-bold">📅 بهترین زمان سفر</p>
                    <p className="text-lg font-black text-gray-800">{city.bestTimeToVisit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1 font-bold">🎭 تعداد رویدادها</p>
                    <p className="text-lg font-black text-gray-800">{cityEvents.length}</p>
                  </div>
                </div>
              </div>

              {/* مشهور به */}
              <div className="kashi-card p-6">
                <h3 className="text-xl font-black text-red-900 mb-4">⭐ مشهور به</h3>
                <div className="flex flex-wrap gap-2">
                  {city.famousFor.map((item, index) => (
                    <span key={index} className="kashi-badge px-4 py-2 text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* دکمه‌ها */}
              <div className="kashi-card p-6 space-y-3">
                <Link
                  href={`/events?city=${city.name}`}
                  className="deep-persian-btn w-full px-6 py-4 text-center font-black block"
                >
                  🎭 رویدادهای {city.name}
                </Link>
                <a
                  href={`https://www.google.com/maps?q=${city.latitude},${city.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-6 py-3 rounded-xl border-2 border-red-900 text-red-900 font-black hover:bg-red-900 hover:text-yellow-200 transition text-center block"
                >
                  🗺️ مشاهده در نقشه
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
