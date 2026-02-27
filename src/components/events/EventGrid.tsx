'use client'

import EventCard from './EventCard'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { EmptyState } from '@/components/shared/EmptyState'
import { Skeleton } from '@/components/ui/skeleton'
import type { Event } from '@/lib/mock-data/events'

interface EventGridProps {
  events: Event[]
  isLoading?: boolean
  variant?: 'default' | 'compact'
}

function EventGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl border overflow-hidden">
          <Skeleton className="h-52 w-full" />
          <div className="p-5 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function EventGrid({ events, isLoading = false, variant = 'default' }: EventGridProps) {
  if (isLoading) {
    return <EventGridSkeleton />
  }

  if (events.length === 0) {
    return (
      <EmptyState
        title="رویدادی یافت نشد"
        description="با تغییر فیلترها یا جستجوی جدید، رویدادهای بیشتری پیدا کنید"
        actionLabel="مشاهده همه رویدادها"
        actionHref="/events"
      />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
