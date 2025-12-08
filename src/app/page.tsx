// src/app/page.tsx

import { mockEvents } from '@/lib/mock-data/events'
import { Hero } from '@/components/shared/Hero'
import { Stats } from '@/components/shared/Stats'
import { FeaturedEvents } from '@/components/events/FeaturedEvents'
import { PopularTopics } from '@/components/shared/PopularTopics'
import { UpcomingEvents } from '@/components/events/UpcomingEvents'
import { CitiesShowcase } from '@/components/cities/CitiesShowcase'
import { CTASection } from '@/components/shared/CTASection'
import { Newsletter } from '@/components/shared/Newsletter'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Search */}
      <Hero />

      {/* Live Statistics with Counter Animations */}
      <Stats />

      {/* Featured Events Slider */}
      <FeaturedEvents events={mockEvents} />

      {/* Popular Topics Cloud */}
      <PopularTopics />

      {/* Upcoming Events Timeline */}
      <UpcomingEvents events={mockEvents} />

      {/* Cities Showcase Grid */}
      <CitiesShowcase />

      {/* CTA for Organizations */}
      <CTASection type="organizations" />

      {/* CTA for AI Suggestions */}
      <CTASection type="ai-suggestions" />

      {/* Newsletter Signup */}
      <Newsletter />
    </main>
  )
}
