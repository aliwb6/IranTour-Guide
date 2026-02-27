import Link from 'next/link'
import { Calendar, MapPin } from 'lucide-react'

interface MapPopupProps {
  event: {
    id: string
    title: string
    slug: string
    city: string
    startDate: string
    shortDescription?: string
  }
}

export function MapPopup({ event }: MapPopupProps) {
  return (
    <div className="p-3 max-w-xs">
      <h4 className="font-bold text-gray-900 mb-1">{event.title}</h4>
      <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {event.startDate}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {event.city}
        </span>
      </div>
      {event.shortDescription && (
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{event.shortDescription}</p>
      )}
      <Link
        href={`/events/${event.slug}`}
        className="inline-block px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-colors"
      >
        جزئیات بیشتر
      </Link>
    </div>
  )
}
