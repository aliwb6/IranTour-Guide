'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Event } from '@/types';
import { useState } from 'react';

interface EventCardProps {
  event: Event;
}

const getEventEmoji = (style: string) => {
  const emojiMap: Record<string, string> = {
    FESTIVAL: '🎊',
    EXHIBITION: '🎨',
    CONFERENCE: '🎤',
    RELIGIOUS: '🕌',
    CULTURAL: '🏛️',
    ARTISTIC: '🎭',
    SPORT: '⚽',
    OTHER: '📅',
  };
  return emojiMap[style] || '📅';
};

const getEventBadgeColor = (style: string) => {
  const colorMap: Record<string, string> = {
    FESTIVAL: 'bg-gradient-to-br from-purple-600 to-purple-700 border-purple-500',
    EXHIBITION: 'bg-gradient-to-br from-blue-600 to-blue-700 border-blue-500',
    CONFERENCE: 'bg-gradient-to-br from-green-600 to-green-700 border-green-500',
    RELIGIOUS: 'bg-gradient-to-br from-amber-600 to-amber-700 border-amber-500',
    CULTURAL: 'bg-gradient-to-br from-red-600 to-red-700 border-red-500',
    ARTISTIC: 'bg-gradient-to-br from-pink-600 to-pink-700 border-pink-500',
    SPORT: 'bg-gradient-to-br from-teal-600 to-teal-700 border-teal-500',
    OTHER: 'bg-gradient-to-br from-gray-600 to-gray-700 border-gray-500',
  };
  return colorMap[style] || 'bg-gradient-to-br from-gray-600 to-gray-700 border-gray-500';
};

export function EventCard({ event }: EventCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="kashi-card">
      {/* Tile Corner Decorations */}
      <div className="tile-corner tile-corner-tl" />
      <div className="tile-corner tile-corner-br" />

      {/* Image Section */}
      <div className="image-overlay h-52 md:h-64">
        <Image
          src={event.featuredImage || '/images/placeholder-event.jpg'}
          alt={event.title}
          fill
          className="object-cover"
          unoptimized
        />

        {/* Badge */}
        <div className={`absolute top-4 right-4 text-xs md:text-sm px-4 py-2 z-10 rounded-xl border-2 text-white font-bold shadow-lg ${getEventBadgeColor(event.style)}`}>
          {getEventEmoji(event.style)} {event.type}
        </div>

        {/* Title Overlay */}
        <h3 className="absolute bottom-4 right-4 left-4 text-xl md:text-2xl font-black text-yellow-200 drop-shadow-lg z-10">
          {event.title}
        </h3>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        {/* Date & Location */}
        <div className="flex items-center gap-4 text-xs md:text-sm text-gray-800 mb-4 flex-wrap font-bold">
          <div className="flex items-center gap-2">
            <span>📅</span>
            <span>{event.dateRangeText}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span>{event.city}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm md:text-base text-gray-700 mb-5 leading-relaxed line-clamp-3">
          {event.shortDescription}
        </p>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {event.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1 rounded-lg bg-red-900/10 text-red-900 font-semibold border border-red-900/20"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link href={`/events/${event.id}`} className="flex-1">
            <button className="deep-persian-btn w-full px-4 py-3 text-sm md:text-base font-bold">
              جزئیات بیشتر
            </button>
          </Link>

          <button
            className={`w-12 h-12 rounded-xl border-2 ${
              isLiked
                ? 'bg-red-900 border-red-900 text-yellow-200'
                : 'border-red-900 text-red-900'
            } flex items-center justify-center hover:bg-red-900 hover:text-yellow-200 transition text-lg`}
            aria-label="Save event"
            onClick={() => setIsLiked(!isLiked)}
          >
            {isLiked ? '❤️' : '🤍'}
          </button>

          <button
            className="w-12 h-12 rounded-xl border-2 border-red-900 text-red-900 flex items-center justify-center hover:bg-red-900 hover:text-yellow-200 transition text-lg"
            aria-label="Share event"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: event.title,
                  text: event.shortDescription,
                  url: `/events/${event.id}`,
                });
              }
            }}
          >
            📤
          </button>
        </div>
      </div>
    </div>
  );
}
