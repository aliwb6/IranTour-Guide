// src/components/events/EventCard.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import type { Event } from '@/lib/mock-data/events'

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  const [imageError, setImageError] = useState(false)

  // Fallback placeholder image
  const fallbackImage = 'https://via.placeholder.com/800x600/D4AF37/FFFFFF?text=IranTour+Guide'

  return (
    <Link href={`/events/${event.slug}`} className="kashi-card block group overflow-hidden">
      <div className="relative h-52 md:h-64 overflow-hidden bg-gray-200">
        <Image
          src={imageError ? fallbackImage : event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-110 transition duration-500"
          onError={() => setImageError(true)}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute top-4 right-4">
          <span className="kashi-badge text-xs md:text-sm px-4 py-2">{event.type}</span>
        </div>

        <h3 className="absolute bottom-4 right-4 left-4 text-xl md:text-2xl font-black text-yellow-200 drop-shadow-lg">
          {event.title}
        </h3>
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-center gap-4 text-xs md:text-sm text-gray-700 mb-4 flex-wrap font-bold">
          <div className="flex items-center gap-2">
            <span>📅</span>
            <span>{event.startDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span>{event.city}</span>
          </div>
        </div>

        <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed line-clamp-2">
          {event.shortDescription}
        </p>

        <div className="deep-persian-btn w-full text-center py-3 font-black text-sm md:text-base">
          مشاهده جزئیات
        </div>
      </div>
    </Link>
  )
}
