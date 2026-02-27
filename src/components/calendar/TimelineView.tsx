'use client'

import { useState } from 'react'
import { ChevronDown, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Event } from '@/lib/mock-data/events'

const PERSIAN_MONTHS = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
]

interface MonthGroup {
  month: string
  year: number
  events: Event[]
}

interface TimelineViewProps {
  events: Event[]
}

export function TimelineView({ events }: TimelineViewProps) {
  const [expandedMonths, setExpandedMonths] = useState<string[]>([])

  const monthGroups: MonthGroup[] = PERSIAN_MONTHS.map((month, index) => ({
    month,
    year: 1404,
    events: events.filter(() => {
      return Math.random() > 0.5
    }).slice(0, 3),
  }))

  const toggleMonth = (key: string) => {
    setExpandedMonths((prev) =>
      prev.includes(key) ? prev.filter((m) => m !== key) : [...prev, key]
    )
  }

  return (
    <div className="space-y-2">
      {monthGroups.map((group) => {
        const key = `${group.year}-${group.month}`
        const isExpanded = expandedMonths.includes(key)

        return (
          <div key={key} className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleMonth(key)}
              className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-amber-600" />
                <span className="font-bold text-gray-900">
                  {group.month} {group.year}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                  {group.events.length} رویداد
                </span>
              </div>
              <ChevronDown className={cn('w-4 h-4 transition-transform', isExpanded && 'rotate-180')} />
            </button>

            {isExpanded && (
              <div className="p-4 space-y-3">
                {group.events.length > 0 ? (
                  group.events.map((event) => (
                    <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-100">
                      <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.city} - {event.startDate}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 text-center py-4">رویدادی در این ماه ثبت نشده</p>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
