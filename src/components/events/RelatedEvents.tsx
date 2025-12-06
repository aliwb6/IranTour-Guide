// src/components/events/RelatedEvents.tsx

import { mockEvents, type Event } from '@/lib/mock-data/events'
import EventCard from './EventCard'

interface RelatedEventsProps {
  currentEvent: Event
}

export default function RelatedEvents({ currentEvent }: RelatedEventsProps) {
  const relatedEvents = mockEvents
    .filter((event) => {
      if (event.id === currentEvent.id) return false
      return event.city === currentEvent.city || event.type === currentEvent.type
    })
    .slice(0, 3)

  if (relatedEvents.length === 0) {
    return null
  }

  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-red-900 mb-3">
          🎯 رویدادهای مشابه
        </h2>
        <p className="text-gray-600 font-bold">
          رویدادهای دیگری که ممکن است برایتان جالب باشد
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}
