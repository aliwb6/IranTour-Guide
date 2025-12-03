import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Heart, Share2 } from 'lucide-react'

interface EventCardProps {
  title: string
  image: string
  badge: string
  date: string
  location: string
  description: string
  slug?: string
}

export function EventCard({
  title,
  image,
  badge,
  date,
  location,
  description,
  slug = '#',
}: EventCardProps) {
  return (
    <div className="kashi-card group">
      {/* Tile Corners */}
      <div className="tile-corner top-right"></div>
      <div className="tile-corner bottom-left"></div>

      {/* Image with Overlay */}
      <div className="relative h-64 image-overlay">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badge on Image */}
        <div className="absolute top-4 right-4 z-10">
          <span className="kashi-badge">{badge}</span>
        </div>

        {/* Title on Image Overlay */}
        <div className="overlay-title">
          <h3 className="font-black text-2xl text-yellow-200 drop-shadow-lg line-clamp-2">
            {title}
          </h3>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Date and Location */}
        <div className="flex flex-col gap-2 mb-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-persian-red" />
            <span className="font-semibold">{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-persian-red" />
            <span className="font-semibold">{location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3">
          {description}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href={`/events/${slug}`}
            className="deep-persian-btn flex-1 text-center text-sm"
          >
            جزئیات بیشتر
          </Link>

          <button
            className="w-10 h-10 rounded-full border-2 border-gold bg-cream hover:bg-light-gold transition-all hover:scale-110 flex items-center justify-center group"
            aria-label="علاقه‌مندی"
          >
            <Heart className="h-5 w-5 text-persian-red group-hover:fill-persian-red transition-all" />
          </button>

          <button
            className="w-10 h-10 rounded-full border-2 border-gold bg-cream hover:bg-light-gold transition-all hover:scale-110 flex items-center justify-center"
            aria-label="اشتراک‌گذاری"
          >
            <Share2 className="h-5 w-5 text-persian-red" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Simple EventCard variant for database events
interface SimpleEventCardProps {
  event: {
    id: string
    title: string
    slug: string
    city: string
    startDate: Date
    endDate: Date
    featuredImage?: string | null
    type: string
    style: string
    shortDescription: string
  }
}

export function SimpleEventCard({ event }: SimpleEventCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  const getTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      NATIONAL: 'ملی',
      RELIGIOUS: 'مذهبی',
      ECONOMIC: 'اقتصادی',
      ARTISTIC: 'هنری',
      SCIENTIFIC: 'علمی',
      TOURISM: 'گردشگری',
      SPORTS: 'ورزشی',
    }
    return labels[type] || type
  }

  return (
    <EventCard
      title={event.title}
      image={event.featuredImage || '/images/default-event.jpg'}
      badge={getTypeLabel(event.type)}
      date={formatDate(event.startDate)}
      location={event.city}
      description={event.shortDescription}
      slug={event.slug}
    />
  )
}
