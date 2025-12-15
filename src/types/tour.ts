export type TourCategory = 'CULTURAL' | 'NATURE' | 'ADVENTURE' | 'HISTORICAL' | 'RELIGIOUS' | 'FOOD'

export type TourStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

export interface Destination {
  id: string
  name: string
  city: string
  province: string
  latitude: number
  longitude: number
  description?: string
}

export interface Tour {
  id: string
  title: string
  slug: string
  description: string
  shortDescription?: string
  category: TourCategory
  status: TourStatus
  price: number
  duration: number // in days
  maxCapacity: number
  minCapacity?: number
  difficulty?: 'EASY' | 'MODERATE' | 'HARD'
  images: string[]
  destinations: Destination[]
  includes: string[]
  excludes: string[]
  itinerary?: TourItinerary[]
  rating?: number
  reviewsCount?: number
  operatorId: string
  createdAt: Date
  updatedAt: Date
}

export interface TourItinerary {
  day: number
  title: string
  description: string
  activities: string[]
}

export interface TourFilter {
  category?: TourCategory
  minPrice?: number
  maxPrice?: number
  duration?: number
  destination?: string
  search?: string
}
