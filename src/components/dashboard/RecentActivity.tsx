import React from 'react'
import { LucideIcon, CheckCircle, XCircle, Eye, Bookmark, Share2, Calendar } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { faIR } from 'date-fns/locale'

export interface Activity {
  id: string
  type:
    | 'event_published'
    | 'event_approved'
    | 'event_rejected'
    | 'new_view'
    | 'new_save'
    | 'new_share'
  message: string
  timestamp: Date
  eventTitle?: string
}

interface RecentActivityProps {
  activities: Activity[]
}

const activityConfig: Record<
  Activity['type'],
  { icon: LucideIcon; color: string; bgColor: string }
> = {
  event_published: {
    icon: Calendar,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  event_approved: {
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  event_rejected: {
    icon: XCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  new_view: {
    icon: Eye,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  new_save: {
    icon: Bookmark,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  new_share: {
    icon: Share2,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
  },
}

const getPersianRelativeTime = (date: Date): string => {
  try {
    const distance = formatDistanceToNow(date, { addSuffix: true, locale: faIR })
    return distance
  } catch {
    return 'چند لحظه پیش'
  }
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 text-center text-gray-500">
        <p>هنوز فعالیتی ثبت نشده است</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-800">فعالیت‌های اخیر</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {activities.map((activity) => {
          const config = activityConfig[activity.type]
          const Icon = config.icon

          return (
            <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${config.bgColor} ${config.color} flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 font-medium mb-1">{activity.message}</p>
                  {activity.eventTitle && (
                    <p className="text-xs text-gray-500 truncate">{activity.eventTitle}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {getPersianRelativeTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
