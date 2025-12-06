'use client'

import React from 'react'
import Image from 'next/image'
import { Calendar, MapPin, Heart, Share2 } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { PersianButton } from '@/components/ui/PersianButton'
import type { MockEvent } from '@/types/mock'

interface EventCardProps {
  event: MockEvent
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="kashi-card">
      <div className="tile-corner tile-corner-tl"></div>
      <div className="tile-corner tile-corner-br"></div>

      <div className="image-overlay h-52 md:h-64">
        <Image
          src={event.image}
          alt={event.title}
          width={800}
          height={600}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-4 right-4 text-xs md:text-sm px-4 py-2 z-10">
          {event.emoji} {event.type}
        </Badge>
        <h3 className="absolute bottom-4 right-4 left-4 text-xl md:text-2xl font-black text-yellow-200 drop-shadow-lg z-10">
          {event.title}
        </h3>
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-center gap-4 text-xs md:text-sm text-gray-800 mb-4 flex-wrap font-bold">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {event.startDate}
              {event.endDate !== event.startDate && ` - ${event.endDate}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{event.city}</span>
          </div>
        </div>
        <p className="text-sm md:text-base text-gray-700 mb-5 leading-relaxed">
          {event.shortDescription}
        </p>
        <div className="flex items-center justify-between gap-3">
          <PersianButton className="flex-1 px-4 py-3 text-sm md:text-base font-bold">
            جزئیات بیشتر
          </PersianButton>
          <button
            type="button"
            className="w-12 h-12 rounded-xl border-2 border-red-900 flex items-center justify-center hover:bg-red-900 hover:text-yellow-200 transition text-lg"
          >
            <Heart className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="w-12 h-12 rounded-xl border-2 border-red-900 flex items-center justify-center hover:bg-red-900 hover:text-yellow-200 transition text-lg"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
