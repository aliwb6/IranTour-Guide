'use client'

import { useState } from 'react'
import { apiEndpoints } from '@/lib/api/client'

interface EventFilters {
  city?: string
  type?: string
  style?: string
  search?: string
  startDate?: string
  endDate?: string
  minPrice?: number
  maxPrice?: number
  isBookable?: boolean
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

interface Event {
  id: string
  title: string
  slug: string
  style: string
  type: string
  city: string
  venue: string
  startDate: Date
  endDate: Date
  basePrice?: number
  currency: string
  maxCapacity?: number
  availableSpots?: number
  isBookable: boolean
  shortDescription: string
  description: string
  featuredImage?: string
  images: string[]
  status: string
  viewCount: number
  saveCount: number
  shareCount: number
  bookingCount: number
  createdAt: Date
  updatedAt: Date
}

interface EventsResponse {
  success: boolean
  data: Event[]
  meta?: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
  error?: string
}

interface EventDetailResponse {
  success: boolean
  data: Event
  error?: string
}

export function useEvents(initialFilters?: EventFilters) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [meta, setMeta] = useState<EventsResponse['meta'] | null>(null)

  const fetchEvents = async (filters?: EventFilters) => {
    setLoading(true)
    setError(null)

    try {
      const response: EventsResponse = await apiEndpoints.events.list(
        filters || initialFilters
      )

      if (!response.success) {
        throw new Error(response.error || 'خطا در دریافت رویدادها')
      }

      setEvents(response.data)
      if (response.meta) {
        setMeta(response.meta)
      }
      return response.data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'خطا در دریافت رویدادها'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { events, meta, fetchEvents, loading, error }
}

export function useEvent(slug: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [event, setEvent] = useState<Event | null>(null)

  const fetchEvent = async () => {
    setLoading(true)
    setError(null)

    try {
      const response: EventDetailResponse = await apiEndpoints.events.get(slug)

      if (!response.success) {
        throw new Error(response.error || 'خطا در دریافت اطلاعات رویداد')
      }

      setEvent(response.data)
      return response.data
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'خطا در دریافت اطلاعات رویداد'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { event, fetchEvent, loading, error }
}

export function useCreateEvent() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createEvent = async (data: any) => {
    setLoading(true)
    setError(null)

    try {
      const response = await apiEndpoints.events.create(data)

      if (!response.success) {
        throw new Error(response.error || 'خطا در ایجاد رویداد')
      }

      return response.data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'خطا در ایجاد رویداد'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { createEvent, loading, error }
}

export function useUpdateEvent(slug: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateEvent = async (data: any) => {
    setLoading(true)
    setError(null)

    try {
      const response = await apiEndpoints.events.update(slug, data)

      if (!response.success) {
        throw new Error(response.error || 'خطا در بروزرسانی رویداد')
      }

      return response.data
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'خطا در بروزرسانی رویداد'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { updateEvent, loading, error }
}

export function useDeleteEvent(slug: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteEvent = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await apiEndpoints.events.delete(slug)

      if (!response.success) {
        throw new Error(response.error || 'خطا در حذف رویداد')
      }

      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'خطا در حذف رویداد'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { deleteEvent, loading, error }
}
