'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Event } from '@/types';
import { useState } from 'react';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Image */}
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        {event.featuredImage ? (
          <Image
            src={event.featuredImage}
            alt={event.title}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-6xl">🎭</span>
          </div>
        )}

        {/* Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-full shadow-lg">
            {event.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-lg">📍</span>
            <span>{event.city}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-lg">📅</span>
            <span>{event.dateRangeText}</span>
          </div>
        </div>

        <p className="text-gray-700 text-sm line-clamp-3 mb-6 min-h-[4.5rem]">
          {event.shortDescription}
        </p>

        <div className="flex gap-3">
          <Link href={`/events/${event.id}`} className="flex-1">
            <button className="w-full gradient-btn text-white py-2.5 rounded-lg font-bold shadow-md">
              مشاهده جزئیات
            </button>
          </Link>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`px-4 ${
              isLiked ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'
            } hover:bg-red-50 hover:text-red-600 rounded-lg transition-all`}
            aria-label="Save event"
          >
            <span className="text-xl">{isLiked ? '❤️' : '🤍'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
