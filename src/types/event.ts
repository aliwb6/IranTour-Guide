export type EventStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

export type EventStyle =
  | 'EXHIBITION'
  | 'FESTIVAL'
  | 'CONFERENCE'
  | 'RELIGIOUS'
  | 'TOURISM'
  | 'SPORTS'
  | 'EDUCATIONAL'
  | 'OTHER'

export type EventType =
  | 'NATIONAL'
  | 'RELIGIOUS'
  | 'ECONOMIC'
  | 'ARTISTIC'
  | 'SCIENTIFIC'
  | 'TOURISM'
  | 'SPORTS'

export type FixedVariable = 'FIXED' | 'VARIABLE'

export interface Event {
  id: string
  title: string
  slug: string
  style: EventStyle
  type: EventType
  fixedOrVariable: FixedVariable
  country: string
  city: string
  venue: string
  address?: string | null
  latitude?: number | null
  longitude?: number | null
  dateRangeText: string
  startDate: Date
  endDate: Date
  registrationDeadline?: Date | null
  durationText?: string | null
  shortDescription: string
  description: string
  opportunities?: string | null
  challenges?: string | null
  featuredImage?: string | null
  images: string[]
  videoUrl?: string | null
  organizerName?: string | null
  organizerEmail?: string | null
  organizerPhone?: string | null
  website?: string | null
  registrationUrl?: string | null
  status: EventStatus
  approvedAt?: Date | null
  rejectedReason?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
  keywords: string[]
  viewCount: number
  saveCount: number
  shareCount: number
  organizationId?: string | null
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date | null
}

export interface EventFilter {
  city?: string
  type?: EventType
  style?: EventStyle
  category?: string
  startDate?: Date
  endDate?: Date
  search?: string
}

export interface EventFormData {
  title: string
  style: EventStyle
  type: EventType
  fixedOrVariable: FixedVariable
  city: string
  venue: string
  address?: string
  dateRangeText: string
  startDate: Date
  endDate: Date
  shortDescription: string
  description: string
  featuredImage?: string
  organizerName: string
  organizerEmail: string
  organizerPhone: string
}