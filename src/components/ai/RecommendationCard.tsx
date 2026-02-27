'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Star, MapPin, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RecommendationCardProps {
  event: {
    id: string
    title: string
    slug: string
    city: string
    startDate: string
    image: string
    shortDescription: string
  }
  matchPercentage: number
  reason: string
}

export function RecommendationCard({ event, matchPercentage, reason }: RecommendationCardProps) {
  const [imageError, setImageError] = useState(false)
  const fallbackImage = 'https://via.placeholder.com/400x300/D4AF37/FFFFFF?text=IranTour'

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={imageError ? fallbackImage : event.image}
          alt={event.title}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
          unoptimized
        />
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-green-500 text-white text-sm font-bold flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" />
          {matchPercentage}٪ تطابق
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-2">{event.title}</h3>

        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {event.city}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {event.startDate}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.shortDescription}</p>

        <div className="bg-blue-50 rounded-lg p-3 mb-4">
          <p className="text-xs font-bold text-blue-800 mb-1">دلیل انتخاب:</p>
          <p className="text-xs text-blue-700">{reason}</p>
        </div>

        <Link
          href={`/events/${event.slug}`}
          className="block w-full text-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm hover:shadow-md transition-shadow"
        >
          مشاهده جزئیات
        </Link>
      </div>
    </div>
  )
}
