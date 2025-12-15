'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MapPin, Sun, Sunset, Moon, Calendar } from 'lucide-react'

interface ItineraryDay {
  day: number
  date: string
  city: string
  morning: string
  afternoon: string
  evening: string
  events: any[] // Event objects
}

interface ItineraryTimelineProps {
  itinerary: ItineraryDay[]
}

export const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({ itinerary }) => {
  const [expandedDays, setExpandedDays] = useState<number[]>([1])

  const toggleDay = (day: number) => {
    setExpandedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  return (
    <div className="space-y-4">
      {itinerary.map((day, index) => {
        const isExpanded = expandedDays.includes(day.day)

        return (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Timeline Line (desktop only) */}
            {index < itinerary.length - 1 && (
              <div className="hidden md:block absolute top-20 right-8 w-1 h-full bg-gold z-0" />
            )}

            {/* Day Card */}
            <div className="kashi-card overflow-hidden">
              {/* Day Header - Clickable */}
              <motion.button
                onClick={() => toggleDay(day.day)}
                whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.05)' }}
                className="w-full p-6 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Day Number Circle */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-yellow-400 flex items-center justify-center flex-shrink-0 z-10 relative shadow-lg">
                    <span className="text-white font-black text-xl">{day.day}</span>
                  </div>

                  {/* Day Info */}
                  <div className="text-right">
                    <h3 className="text-2xl font-black text-red-900 mb-1">روز {day.day}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className="font-bold">{day.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gold" />
                        <span className="font-bold">{day.city}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expand Icon */}
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                </motion.div>
              </motion.button>

              {/* Day Details - Expandable */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-6">
                      {/* Morning */}
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                          <Sun className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-black text-gray-800 mb-2">صبح</h4>
                          <p className="text-gray-700 font-medium">{day.morning}</p>
                        </div>
                      </div>

                      {/* Afternoon */}
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                          <Sunset className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-black text-gray-800 mb-2">بعدازظهر</h4>
                          <p className="text-gray-700 font-medium">{day.afternoon}</p>
                        </div>
                      </div>

                      {/* Evening */}
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                          <Moon className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-black text-gray-800 mb-2">عصر و شب</h4>
                          <p className="text-gray-700 font-medium">{day.evening}</p>
                        </div>
                      </div>

                      {/* Events for This Day */}
                      {day.events && day.events.length > 0 && (
                        <div className="pt-4 border-t-2 border-gray-200">
                          <h4 className="text-lg font-black text-red-900 mb-4">
                            رویدادهای این روز
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {day.events.map((event) => (
                              <Link key={event.id} href={`/events/${event.slug}`}>
                                <motion.div
                                  whileHover={{ y: -3, scale: 1.02 }}
                                  className="flex gap-3 p-3 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl cursor-pointer border-2 border-transparent hover:border-gold transition-all"
                                >
                                  {event.image && (
                                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                                      <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-black text-purple-900 text-sm mb-1 line-clamp-1">
                                      {event.title}
                                    </h5>
                                    <p className="text-xs text-gray-600 font-medium line-clamp-2">
                                      {event.shortDescription}
                                    </p>
                                  </div>
                                </motion.div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
