'use client'

import { useState } from 'react'
import { apiEndpoints } from '@/lib/api/client'

interface SavedEvent {
  id: string
  title: string
  slug: string
  city: string
  type: string
  style: string
  startDate: Date
  endDate: Date
  featuredImage?: string
  basePrice?: number
  currency: string
  shortDescription: string
  isBookable: boolean
  availableSpots?: number
  savedAt: Date
}

interface SavedEventsResponse {
  success: boolean
  data: SavedEvent[]
  error?: string
}

interface ToggleSavedEventResponse {
  success: boolean
  message: string
  saved: boolean
  error?: string
}

export function useToggleSavedEvent() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleSavedEvent = async (eventSlug: string) => {
    setLoading(true)
    setError(null)

    try {
      const response: ToggleSavedEventResponse = await apiEndpoints.savedEvents.toggle(eventSlug)

      if (!response.success) {
        throw new Error(response.error || 'خطا در ذخیره رویداد')
      }

      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'خطا در ذخیره رویداد'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { toggleSavedEvent, loading, error }
}

export function useSavedEvents() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([])

  const fetchSavedEvents = async () => {
    setLoading(true)
    setError(null)

    try {
      const response: SavedEventsResponse = await apiEndpoints.savedEvents.list()

      if (!response.success) {
        throw new Error(response.error || 'خطا در دریافت رویدادهای ذخیره شده')
      }

      setSavedEvents(response.data)
      return response.data
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'خطا در دریافت رویدادهای ذخیره شده'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { savedEvents, fetchSavedEvents, loading, error }
}

export function useCheckSavedEvent(eventSlug: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSaved, setIsSaved] = useState(false)

  const checkSavedEvent = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await apiEndpoints.savedEvents.check(eventSlug)

      if (!response.success) {
        throw new Error(response.error || 'خطا در بررسی وضعیت ذخیره')
      }

      setIsSaved(response.saved)
      return response.saved
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'خطا در بررسی وضعیت ذخیره'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { isSaved, checkSavedEvent, loading, error }
}
