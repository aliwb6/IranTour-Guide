'use client'

import { useState } from 'react'
import { apiEndpoints } from '@/lib/api/client'

interface CreateReviewData {
  eventId: string
  rating: number
  title?: string
  comment: string
  pros?: string
  cons?: string
  images?: string[]
}

interface Review {
  id: string
  userId: string
  eventId: string
  rating: number
  title?: string
  comment: string
  pros?: string
  cons?: string
  images: string[]
  isVerified: boolean
  isApproved: boolean
  isPinned: boolean
  helpfulCount: number
  reportCount: number
  organizationResponse?: string
  respondedAt?: Date
  createdAt: Date
  updatedAt: Date
  approvedAt?: Date
}

interface ReviewsResponse {
  success: boolean
  data: Review[]
  stats?: {
    averageRating: number
    totalReviews: number
    ratingDistribution: {
      1: number
      2: number
      3: number
      4: number
      5: number
    }
  }
  error?: string
}

export function useCreateReview() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createReview = async (data: CreateReviewData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await apiEndpoints.reviews.create(data)

      if (!response.success) {
        throw new Error(response.error || 'خطا در ثبت نظر')
      }

      return response.data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'خطا در ثبت نظر'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { createReview, loading, error }
}

export function useReviews(eventId: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState<ReviewsResponse['stats'] | null>(null)

  const fetchReviews = async () => {
    setLoading(true)
    setError(null)

    try {
      const response: ReviewsResponse = await apiEndpoints.reviews.list(eventId)

      if (!response.success) {
        throw new Error(response.error || 'خطا در دریافت نظرات')
      }

      setReviews(response.data)
      if (response.stats) {
        setStats(response.stats)
      }
      return response.data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'خطا در دریافت نظرات'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { reviews, stats, fetchReviews, loading, error }
}
