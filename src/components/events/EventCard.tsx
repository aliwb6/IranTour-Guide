import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Bookmark } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'

interface EventCardProps {
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
  variant?: 'default' | 'compact' | 'featured'
}

export function EventCard({ event, variant = 'default' }: EventCardProps) {
  const isFeatured = variant === 'featured'
  const isCompact = variant === 'compact'

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/events/${event.slug}`}>
        {/* Image */}
        <div className={`relative ${isFeatured ? 'h-64' : isCompact ? 'h-40' : 'h-48'} bg-gray-200`}>
          {event.featuredImage ? (
            <Image
              src={event.featuredImage}
              alt={event.title}
              fill
              className="object-cover"
              sizes={isFeatured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <span className="text-muted-foreground">بدون تصویر</span>
            </div>
          )}

          {/* Type Badge */}
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full">
              {getTypeLabel(event.type)}
            </span>
          </div>
        </div>
      </Link>

      <CardHeader className="pb-3">
        <Link href={`/events/${event.slug}`}>
          <h3 className={`font-bold hover:text-primary transition-colors ${isFeatured ? 'text-2xl' : 'text-lg'}`}>
            {event.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="pb-3">
        {!isCompact && <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{event.shortDescription}</p>}

        <div className="space-y-2 text-sm">
          {/* Date */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {formatDate(event.startDate)} {event.startDate !== event.endDate && `- ${formatDate(event.endDate)}`}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{event.city}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t flex justify-between items-center">
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">
            {getStyleLabel(event.style)}
          </span>
        </div>

        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bookmark className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

function getTypeLabel(type: string): string {
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

function getStyleLabel(style: string): string {
  const labels: Record<string, string> = {
    EXHIBITION: 'نمایشگاه',
    FESTIVAL: 'جشنواره',
    CONFERENCE: 'همایش',
    RELIGIOUS: 'مذهبی',
    TOURISM: 'گردشگری',
    SPORTS: 'ورزشی',
    EDUCATIONAL: 'آموزشی',
    OTHER: 'سایر',
  }
  return labels[style] || style
}