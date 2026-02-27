'use client'

import { Calendar, MapPin, Clock, Printer, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ItineraryDay {
  day: number
  date: string
  events: {
    title: string
    time: string
    location: string
    notes?: string
  }[]
}

interface ItineraryDisplayProps {
  title?: string
  days: ItineraryDay[]
  onPrint?: () => void
  onShare?: () => void
  className?: string
}

export function ItineraryDisplay({
  title = 'برنامه سفر پیشنهادی',
  days,
  onPrint,
  onShare,
  className,
}: ItineraryDisplayProps) {
  return (
    <div className={cn('bg-white rounded-xl border border-gray-200 overflow-hidden', className)}>
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-amber-50 to-orange-50">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <div className="flex items-center gap-2">
          {onPrint && (
            <button
              onClick={onPrint}
              className="p-2 rounded-lg hover:bg-white/80 transition-colors text-gray-600"
            >
              <Printer className="w-4 h-4" />
            </button>
          )}
          {onShare && (
            <button
              onClick={onShare}
              className="p-2 rounded-lg hover:bg-white/80 transition-colors text-gray-600"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {days.map((day) => (
          <div key={day.day} className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm shrink-0">
                {day.day}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">روز {day.day}</h4>
                <span className="text-xs text-gray-500">{day.date}</span>
              </div>
            </div>

            <div className="mr-5 border-r-2 border-amber-200 pr-6 space-y-3">
              {day.events.map((event, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-medium text-gray-900 mb-1">{event.title}</h5>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </span>
                  </div>
                  {event.notes && (
                    <p className="mt-2 text-xs text-gray-600 bg-blue-50 rounded p-2">{event.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
