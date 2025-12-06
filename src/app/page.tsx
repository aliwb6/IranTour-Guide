import React from 'react'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Hero } from '@/components/layout/Hero'
import { EventCard } from '@/components/events/EventCard'
import { Footer } from '@/components/layout/Footer'
import { PersianButton } from '@/components/ui/PersianButton'
import { Tag } from '@/components/ui/Tag'
import { mockEvents } from '@/lib/mock-data/events'
import { getPopularCategories } from '@/lib/mock-data/categories'

export const metadata: Metadata = {
  title: 'IranTour Guide | راهنمای رویدادهای ایران',
  description:
    'کشف و تجربه بهترین رویدادهای فرهنگی، مذهبی، هنری و گردشگری ایران',
}

export default function HomePage() {
  // گرفتن اولین 6 رویداد ویژه
  const featuredEvents = mockEvents.filter((e) => e.featured).slice(0, 3)
  const allEventsForDisplay = mockEvents.slice(0, 6)

  // موضوعات محبوب
  const popularCategories = getPopularCategories()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* DIVIDER */}
      <div className="kashi-divider max-w-6xl mx-auto"></div>

      {/* EVENTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16" id="events">
        <div className="flex justify-between items-center mb-8 md:mb-12 flex-wrap gap-4">
          <h2 className="text-3xl md:text-4xl font-black text-red-900">
            🎭 رویدادهای ویژه
          </h2>
          <PersianButton className="px-6 py-2.5 text-sm md:text-base">
            مشاهده همه ←
          </PersianButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {allEventsForDisplay.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div className="kashi-divider max-w-6xl mx-auto"></div>

      {/* POPULAR TOPICS */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-black text-red-900 mb-8 md:mb-12 text-center">
          🏛️ موضوعات محبوب
        </h2>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {popularCategories.map((category) => (
            <Tag
              key={category.id}
              className="px-5 md:px-7 py-3 md:py-3.5 text-sm md:text-base"
            >
              {category.emoji} {category.name}
            </Tag>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
