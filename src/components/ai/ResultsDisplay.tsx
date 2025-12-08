'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  MapPin,
  Share2,
  Download,
  Save,
  ChevronDown,
  Lightbulb,
  Heart
} from 'lucide-react'
import { ItineraryTimeline } from './ItineraryTimeline'
import moment from 'moment-jalaali'

interface SuggestedEvent {
  event: any // Event object
  relevanceScore: number
  reason: string
}

interface ResultsDisplayProps {
  userName: string
  summary: string
  suggestions: SuggestedEvent[]
  itinerary: any[]
  tips: string[]
}

type TabType = 'events' | 'itinerary' | 'tips'

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  userName,
  summary,
  suggestions,
  itinerary,
  tips
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('events')
  const [expandedReasons, setExpandedReasons] = useState<string[]>([])

  const toggleReason = (eventId: string) => {
    setExpandedReasons(prev =>
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    )
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'برنامه سفر من',
          text: summary,
          url: window.location.href
        })
      } catch (err) {
        console.error('Share failed:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('لینک در کلیپ‌بورد کپی شد!')
    }
  }

  const handleDownload = () => {
    // TODO: Implement PDF download
    alert('قابلیت دانلود PDF به زودی اضافه می‌شود')
  }

  const handleSave = () => {
    // TODO: Implement save to profile
    alert('قابلیت ذخیره در پروفایل به زودی اضافه می‌شود')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="kashi-card p-6 md:p-10 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-red-900 mb-3">
                سلام {userName} عزیز! ✨
              </h1>
              <p className="text-lg text-gray-700 font-bold leading-relaxed">
                {summary}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-4 py-3 rounded-xl bg-white border-2 border-gray-300 text-gray-700 font-bold hover:border-gold transition-colors flex items-center gap-2"
                title="اشتراک‌گذاری"
              >
                <Share2 className="w-5 h-5" />
                <span className="hidden md:inline">اشتراک</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="px-4 py-3 rounded-xl bg-white border-2 border-gray-300 text-gray-700 font-bold hover:border-gold transition-colors flex items-center gap-2"
                title="دانلود PDF"
              >
                <Download className="w-5 h-5" />
                <span className="hidden md:inline">دانلود</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="px-4 py-3 rounded-xl deep-persian-btn font-bold flex items-center gap-2"
                title="ذخیره"
              >
                <Save className="w-5 h-5" />
                <span className="hidden md:inline">ذخیره</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('events')}
              className={`
                px-6 py-3 rounded-xl font-black whitespace-nowrap transition-all
                ${activeTab === 'events'
                  ? 'deep-persian-btn'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gold'
                }
              `}
            >
              رویدادهای پیشنهادی ({suggestions.length})
            </button>

            <button
              onClick={() => setActiveTab('itinerary')}
              className={`
                px-6 py-3 rounded-xl font-black whitespace-nowrap transition-all
                ${activeTab === 'itinerary'
                  ? 'deep-persian-btn'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gold'
                }
              `}
            >
              برنامه سفر ({itinerary.length} روز)
            </button>

            <button
              onClick={() => setActiveTab('tips')}
              className={`
                px-6 py-3 rounded-xl font-black whitespace-nowrap transition-all
                ${activeTab === 'tips'
                  ? 'deep-persian-btn'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gold'
                }
              `}
            >
              نکات سفر ({tips.length})
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {/* Tab 1: Suggested Events */}
          {activeTab === 'events' && (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestions.map((suggestion, index) => {
                  const { event, relevanceScore, reason } = suggestion
                  const isReasonExpanded = expandedReasons.includes(event.id)

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="kashi-card overflow-hidden h-full flex flex-col">
                        {/* Event Image */}
                        <Link href={`/events/${event.slug}`}>
                          <div className="relative h-48 overflow-hidden cursor-pointer group">
                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Relevance Badge */}
                            <div className="absolute top-4 right-4 bg-gold/95 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                              <Heart className="w-4 h-4 text-white fill-white" />
                              <span className="text-white font-black">{relevanceScore}٪</span>
                            </div>
                          </div>
                        </Link>

                        {/* Event Info */}
                        <div className="p-6 flex-1 flex flex-col">
                          <Link href={`/events/${event.slug}`}>
                            <h3 className="text-xl font-black text-red-900 mb-3 hover:text-gold transition-colors cursor-pointer line-clamp-2">
                              {event.title}
                            </h3>
                          </Link>

                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-red-900" />
                              <span className="font-bold">
                                {moment(event.startDate, 'jYYYY-jMM-jDD').format('jD jMMMM')}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-red-900" />
                              <span className="font-bold">{event.city}</span>
                            </div>
                          </div>

                          <p className="text-gray-700 font-medium text-sm mb-4 line-clamp-2">
                            {event.shortDescription}
                          </p>

                          {/* AI Reason - Expandable */}
                          <div className="mt-auto">
                            <button
                              onClick={() => toggleReason(event.id)}
                              className="w-full p-3 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl flex items-center justify-between hover:from-purple-100 hover:to-blue-100 transition-colors"
                            >
                              <span className="text-sm font-bold text-purple-900">
                                چرا این رویداد؟
                              </span>
                              <motion.div
                                animate={{ rotate: isReasonExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="w-4 h-4 text-purple-900" />
                              </motion.div>
                            </button>

                            <AnimatePresence>
                              {isReasonExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <p className="p-3 text-sm text-gray-700 font-medium bg-purple-50/50 rounded-b-xl">
                                    {reason}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* View Details Button */}
                          <Link href={`/events/${event.slug}`}>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full mt-4 deep-persian-btn px-4 py-3 font-bold text-sm"
                            >
                              مشاهده جزئیات
                            </motion.button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Tab 2: Itinerary */}
          {activeTab === 'itinerary' && (
            <motion.div
              key="itinerary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ItineraryTimeline itinerary={itinerary} />
            </motion.div>
          )}

          {/* Tab 3: Tips */}
          {activeTab === 'tips' && (
            <motion.div
              key="tips"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="kashi-card p-6 flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-bold leading-relaxed">{tip}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
