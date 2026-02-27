'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Calendar, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SaveButton } from '@/components/shared/SaveButton'
import type { Event } from '@/lib/mock-data/events'

interface EventListProps {
  events: Event[]
}

function EventListItem({ event }: { event: Event }) {
  const [imageError, setImageError] = useState(false)
  const fallbackImage = 'https://via.placeholder.com/400x300/D4AF37/FFFFFF?text=IranTour'

  return (
    <Link
      href={`/events/${event.slug}`}
      className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all bg-white group"
    >
      <div className="relative w-32 h-24 md:w-48 md:h-32 rounded-lg overflow-hidden shrink-0 bg-gray-200">
        <Image
          src={imageError ? fallbackImage : event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => setImageError(true)}
          unoptimized
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-gray-900 text-lg truncate">{event.title}</h3>
          <SaveButton eventId={event.id} size="sm" />
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {event.startDate}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {event.city}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
            {event.type}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{event.shortDescription}</p>
      </div>
    </Link>
  )
}

export function EventList({ events }: EventListProps) {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <EventListItem key={event.id} event={event} />
      ))}
    </div>
  )
}
