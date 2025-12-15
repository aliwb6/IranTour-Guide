'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Tag, X, Plus, Calendar } from 'lucide-react'
import { EmptyState } from '@/components/profile/EmptyState'

interface Topic {
  id: string
  name: string
  eventCount: number
}

const mockTopics: Topic[] = [
  { id: '1', name: 'سینما و فیلم', eventCount: 42 },
  { id: '2', name: 'موسیقی', eventCount: 38 },
  { id: '3', name: 'تاریخ و معماری', eventCount: 56 },
  { id: '4', name: 'طبیعت و کوهنوردی', eventCount: 24 },
  { id: '5', name: 'جشنواره‌ها', eventCount: 31 },
]

export default function FollowedTopicsPage() {
  const [topics, setTopics] = useState(mockTopics)

  const handleUnfollow = (topicId: string) => {
    if (confirm('آیا مطمئن هستید که می‌خواهید این موضوع را دنبال نکنید؟')) {
      setTopics((prev) => prev.filter((t) => t.id !== topicId))
    }
  }

  if (topics.length === 0) {
    return (
      <EmptyState
        icon={Tag}
        title="موضوع دنبال‌شده‌ای ندارید"
        description="با دنبال کردن موضوعات مورد علاقه، از رویدادهای جدید آن‌ها با خبر شوید"
        actionLabel="جستجوی موضوعات"
        actionHref="/events"
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="kashi-card p-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-red-900 mb-2">موضوعات دنبال‌شده</h1>
          <p className="text-gray-600 font-medium">{topics.length} موضوع دنبال می‌کنید</p>
        </div>

        <Link href="/events">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="deep-persian-btn px-6 py-3 font-bold flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            افزودن موضوع
          </motion.button>
        </Link>
      </div>

      {/* Topics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="kashi-card p-6 relative group"
          >
            {/* Remove Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleUnfollow(topic.id)}
              className="absolute top-3 left-3 w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </motion.button>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                <Tag className="w-8 h-8 text-purple-900" />
              </div>
            </div>

            {/* Topic Name */}
            <h3 className="text-xl font-black text-red-900 mb-2 text-center">{topic.name}</h3>

            {/* Event Count */}
            <div className="flex items-center justify-center gap-2 text-gray-600 font-bold mb-4">
              <Calendar className="w-4 h-4" />
              <span>{topic.eventCount} رویداد</span>
            </div>

            {/* View Events Button */}
            <Link href={`/events?topic=${encodeURIComponent(topic.name)}`}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2 rounded-xl bg-white border-2 border-gray-300 text-gray-700 font-bold hover:border-gold hover:text-gold transition-colors"
              >
                مشاهده رویدادها
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
