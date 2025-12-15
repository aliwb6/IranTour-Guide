'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bookmark, Tag, MapPin, Clock } from 'lucide-react'
import moment from 'moment-jalaali'

interface Activity {
  id: string
  type: 'saved_event' | 'followed_topic' | 'followed_city'
  title: string
  subtitle?: string
  link: string
  timestamp: string
}

interface ActivityFeedProps {
  activities: Activity[]
}

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'saved_event':
      return Bookmark
    case 'followed_topic':
      return Tag
    case 'followed_city':
      return MapPin
  }
}

const getActivityText = (type: Activity['type']) => {
  switch (type) {
    case 'saved_event':
      return 'ذخیره کردید'
    case 'followed_topic':
      return 'دنبال کردید'
    case 'followed_city':
      return 'دنبال کردید'
  }
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <div className="space-y-3">
      {activities.map((activity, index) => {
        const Icon = getActivityIcon(activity.type)
        const actionText = getActivityText(activity.type)
        const relativeTime = moment(activity.timestamp).fromNow()

        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={activity.link}>
              <motion.div
                whileHover={{ x: 5, backgroundColor: 'rgba(212, 175, 55, 0.05)' }}
                className="flex items-start gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-gold transition-all cursor-pointer"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-purple-900" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-bold mb-1">
                    <span className="text-gold">{actionText}</span>
                    {': '}
                    <span className="text-gray-900">{activity.title}</span>
                  </p>
                  {activity.subtitle && (
                    <p className="text-sm text-gray-600 font-medium mb-1">{activity.subtitle}</p>
                  )}
                  <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                    <Clock className="w-3 h-3" />
                    {relativeTime}
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
