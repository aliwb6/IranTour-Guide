'use client';

import { useState, useEffect } from 'react';

interface Review {
  id: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  isVerified: boolean;
  helpfulCount: number;
  user: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
}

interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  verifiedCount: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export function useReviews(eventId: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/events/${eventId}/reviews`);

        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }

        const data = await response.json();
        setReviews(data.reviews || []);
        setStats(data.stats || null);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err instanceof Error ? err.message : 'Failed to load reviews');
        setReviews([]);
        setStats(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchReviews();
    }
  }, [eventId]);

  return {
    reviews,
    stats,
    isLoading,
    error,
  };
}

export function useCreateReview() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createReview = async (data: {
    eventId: string;
    rating: number;
    title?: string;
    comment: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/events/${data.eventId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: data.rating,
          title: data.title,
          comment: data.comment,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create review');
      }

      // Reload the page to show the new review
      window.location.reload();
    } catch (err) {
      console.error('Error creating review:', err);
      const errorMessage = err instanceof Error ? err.message : 'خطا در ثبت نظر';
      setError(errorMessage);
      alert(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createReview,
    isLoading,
    error,
  };
}
