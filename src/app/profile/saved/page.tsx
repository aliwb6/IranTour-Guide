'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Grid, List, Trash2, BookmarkX } from 'lucide-react'
import EventCard from '@/components/events/EventCard'
import { EmptyState } from '@/components/profile/EmptyState'
import { mockEvents } from '@/lib/mock-data/events'

export default function SavedEventsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [savedEvents, setSavedEvents] = useState(mockEvents.slice(0, 6))

  const handleRemove = (eventId: string) => {
    if (confirm('آیا مطمئن هستید که می‌خواهید این رویداد را از لیست ذخیره‌شده‌ها حذف کنید؟')) {
      setSavedEvents(prev => prev.filter(e => e.id !== eventId))
    }
  }

  if (savedEvents.length === 0) {
    return (
      <EmptyState
        icon={BookmarkX}
        title="رویداد ذخیره‌شده‌ای ندارید"
        description="رویدادهای مورد علاقه خود را ذخیره کنید تا بعداً به آن‌ها دسترسی داشته باشید"
        actionLabel="جستجوی رویدادها"
        actionHref="/events"
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="kashi-card p-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-red-900 mb-2">
            رویدادهای ذخیره‌شده
          </h1>
          <p className="text-gray-600 font-medium">
            {savedEvents.length} رویداد ذخیره شده
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('grid')}
            className={`p-3 rounded-xl transition-colors ${
              viewMode === 'grid'
                ? 'bg-gold text-white'
                : 'bg-white border-2 border-gray-300 text-gray-700'
            }`}
          >
            <Grid className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('list')}
            className={`p-3 rounded-xl transition-colors ${
              viewMode === 'list'
                ? 'bg-gold text-white'
                : 'bg-white border-2 border-gray-300 text-gray-700'
            }`}
          >
            <List className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Events Grid/List */}
      <div className={
        viewMode === 'grid'
          ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
      }>
        {savedEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative group"
          >
            <EventCard event={event} />

            {/* Remove Button */}
            <motion.button
              initial={{ opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleRemove(event.id)}
              className="absolute top-4 left-4 w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
              title="حذف از ذخیره‌شده‌ها"
            >
              <Trash2 className="w-5 h-5" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
