'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock } from 'lucide-react'
import moment from 'moment-jalaali'

interface Event {
  id: string
  title: string
  slug: string
  city: string
  type: string
  startDate: string
  endDate: string
  image: string
  venue: string
}

interface UpcomingEventsProps {
  events: Event[]
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  // Sort by date and get next 8 upcoming events
  const upcomingEvents = [...events]
    .sort((a, b) => {
      const dateA = moment(a.startDate, 'jYYYY-jMM-jDD')
      const dateB = moment(b.startDate, 'jYYYY-jMM-jDD')
      return dateA.diff(dateB)
    })
    .slice(0, 8)

  if (upcomingEvents.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-red-900 mb-4">📅 رویدادهای پیش رو</h2>
          <p className="text-xl text-gray-700 font-bold">
            برنامه‌ریزی کنید و رویدادهای آینده را از دست ندهید
          </p>
        </motion.div>

        {/* Desktop: Horizontal Scroll, Mobile: Vertical List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Timeline Container */}
          <div className="hidden md:flex overflow-x-auto pb-8 gap-8 scrollbar-hide">
            <div className="flex gap-8 min-w-max">
              {upcomingEvents.map((event, index) => {
                const startDate = moment(event.startDate, 'jYYYY-jMM-jDD')
                const isToday = startDate.isSame(moment(), 'day')

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline Connector */}
                    {index > 0 && <div className="absolute top-14 right-full w-8 h-0.5 bg-gold" />}

                    {/* Date Bubble */}
                    <div className={`mb-4 text-center ${isToday ? 'animate-pulse' : ''}`}>
                      <div
                        className={`inline-block rounded-full px-6 py-3 font-black text-white ${
                          isToday ? 'bg-gradient-to-br from-red-900 to-red-700' : 'bg-gold'
                        }`}
                      >
                        <div className="text-sm">{startDate.format('jDD jMMMM')}</div>
                        <div className="text-xs opacity-90">{startDate.format('jYYYY')}</div>
                      </div>
                    </div>

                    {/* Event Card */}
                    <Link href={`/events/${event.slug}`}>
                      <motion.div
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="w-72 kashi-card overflow-hidden cursor-pointer"
                      >
                        <div className="relative h-40">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-black text-red-900 mb-2 line-clamp-2">
                            {event.title}
                          </h3>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-red-900" />
                              <span className="font-bold">{event.city}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5 text-red-900" />
                              <span className="font-bold">{event.venue}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Mobile: Vertical List */}
          <div className="md:hidden space-y-4">
            {upcomingEvents.map((event, index) => {
              const startDate = moment(event.startDate, 'jYYYY-jMM-jDD')

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/events/${event.slug}`}>
                    <div className="kashi-card flex gap-4 p-4">
                      {/* Date */}
                      <div className="flex-shrink-0 text-center bg-gold rounded-xl px-4 py-3">
                        <div className="text-lg font-black text-white">
                          {startDate.format('jDD')}
                        </div>
                        <div className="text-xs font-bold text-white opacity-90">
                          {startDate.format('jMMMM')}
                        </div>
                      </div>

                      {/* Event Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-black text-red-900 mb-2 line-clamp-2">
                          {event.title}
                        </h3>
                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-red-900" />
                            <span className="font-bold">{event.city}</span>
                          </div>
                        </div>
                      </div>

                      {/* Thumbnail */}
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image src={event.image} alt={event.title} fill className="object-cover" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/events">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="deep-persian-btn px-8 py-4 font-black inline-block"
            >
              مشاهده همه رویدادها ←
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
