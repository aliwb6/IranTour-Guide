'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bookmark, Tag, MapPin, Eye, Search, Plus } from 'lucide-react'
import { StatisticsCard } from '@/components/profile/StatisticsCard'
import { ActivityFeed } from '@/components/profile/ActivityFeed'
import EventCard from '@/components/events/EventCard'
import { mockEvents } from '@/lib/mock-data/events'

// Mock data - Replace with real API calls
const mockStats = {
  savedEvents: 12,
  followedTopics: 5,
  followedCities: 3,
  views: 156,
}

const mockActivities = [
  {
    id: '1',
    type: 'saved_event' as const,
    title: 'جشنواره فیلم فجر',
    subtitle: 'تهران',
    link: '/events/fajr-film-festival',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    type: 'followed_topic' as const,
    title: 'سینما و فیلم',
    link: '/events?topic=cinema',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    type: 'followed_city' as const,
    title: 'اصفهان',
    link: '/cities/isfahan',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    type: 'saved_event' as const,
    title: 'نمایشگاه کتاب تهران',
    subtitle: 'تهران',
    link: '/events/tehran-book-fair',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

const recommendedEvents = mockEvents.filter((e) => e.featured).slice(0, 3)

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="kashi-card p-8"
      >
        <h1 className="text-4xl font-black text-red-900 mb-3">سلام، کاربر عزیز! 👋</h1>
        <p className="text-lg text-gray-700 font-medium mb-6">
          به پروفایل خود خوش آمدید. از اینجا می‌توانید رویدادهای ذخیره‌شده، موضوعات و شهرهای مورد
          علاقه خود را مدیریت کنید.
        </p>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/events">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="deep-persian-btn px-6 py-3 font-bold flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              جستجوی رویدادها
            </motion.button>
          </Link>

          <Link href="/ai-suggest">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-xl bg-white border-2 border-gray-300 text-gray-700 font-bold hover:border-gold hover:text-gold transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              پیشنهاد هوشمند
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Statistics */}
      <div>
        <h2 className="text-2xl font-black text-red-900 mb-4">آمار فعالیت</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatisticsCard
            label="رویدادهای ذخیره‌شده"
            value={mockStats.savedEvents}
            icon={Bookmark}
            link="/profile/saved"
            index={0}
          />
          <StatisticsCard
            label="موضوعات دنبال‌شده"
            value={mockStats.followedTopics}
            icon={Tag}
            link="/profile/followed-topics"
            index={1}
          />
          <StatisticsCard
            label="شهرهای دنبال‌شده"
            value={mockStats.followedCities}
            icon={MapPin}
            link="/profile/followed-cities"
            index={2}
          />
          <StatisticsCard label="بازدیدها" value={mockStats.views} icon={Eye} index={3} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black text-red-900">فعالیت‌های اخیر</h2>
            <Link href="/profile/activity" className="text-gold font-bold text-sm hover:underline">
              مشاهده همه
            </Link>
          </div>

          <ActivityFeed activities={mockActivities} />
        </div>

        {/* Recommended Events */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black text-red-900">پیشنهاد ویژه</h2>
            <Link href="/events" className="text-gold font-bold text-sm hover:underline">
              مشاهده همه
            </Link>
          </div>

          <div className="space-y-4">
            {recommendedEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
