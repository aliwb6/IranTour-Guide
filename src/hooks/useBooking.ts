'use client'

import { useState } from 'react'
import { apiEndpoints } from '@/lib/api/client'
import { useRouter } from 'next/navigation'

interface CreateBookingData {
  eventId: string
  eventTitle: string
  eventDate: Date | string
  firstName: string
  lastName: string
  email: string
  phone: string
  nationalId?: string
  numberOfAdults: number
  numberOfChildren?: number
  specialRequests?: string
  pricePerPerson: number
  childrenPrice?: number
  discount?: number
}

export function useCreateBooking() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createBooking = async (data: CreateBookingData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await apiEndpoints.bookings.create(data)

      if (!response.success) {
        throw new Error(response.error || 'خطا در ثبت رزرو')
      }

      return response.data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'خطا در ثبت رزرو'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { createBooking, loading, error }
}

export function useCancelBooking() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const cancelBooking = async (id: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await apiEndpoints.bookings.cancel(id)

      if (!response.success) {
        throw new Error(response.error || 'خطا در کنسل رزرو')
      }

      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'خطا در کنسل رزرو'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { cancelBooking, loading, error }
}

export function useBookings() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bookings, setBookings] = useState<any[]>([])

  const fetchBookings = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await apiEndpoints.bookings.list()

      if (!response.success) {
        throw new Error(response.error || 'خطا در دریافت رزروها')
      }

      setBookings(response.data)
      return response.data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'خطا در دریافت رزروها'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { bookings, fetchBookings, loading, error }
}

export function useBooking(id: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [booking, setBooking] = useState<any | null>(null)

  const fetchBooking = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await apiEndpoints.bookings.get(id)

      if (!response.success) {
        throw new Error(response.error || 'خطا در دریافت اطلاعات رزرو')
      }

      setBooking(response.data)
      return response.data
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'خطا در دریافت اطلاعات رزرو'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { booking, fetchBooking, loading, error }
}
