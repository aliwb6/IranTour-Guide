'use client';

import { useState, useEffect } from 'react';

interface SavedEvent {
  id: string;
  event: {
    id: string;
    title: string;
    slug: string;
    featuredImage: string | null;
    startDate: Date;
    city: string;
    venue: string;
    basePrice: number | null;
  };
  createdAt: Date;
}

export function useSavedEvents() {
  const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedEvents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/saved-events');

        if (!response.ok) {
          throw new Error('Failed to fetch saved events');
        }

        const data = await response.json();
        setSavedEvents(data);
      } catch (err) {
        console.error('Error fetching saved events:', err);
        setError(err instanceof Error ? err.message : 'Failed to load saved events');
        setSavedEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedEvents();
  }, []);

  return {
    savedEvents,
    isLoading,
    error,
  };
}

export function useToggleSavedEvent() {
  const [isToggling, setIsToggling] = useState(false);

  const toggleSavedEvent = async (eventSlug: string) => {
    try {
      setIsToggling(true);
      const response = await fetch('/api/saved-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventSlug }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle saved event');
      }

      // Reload the page to refresh the list
      window.location.reload();
    } catch (err) {
      console.error('Error toggling saved event:', err);
      alert('خطا در ذخیره/حذف رویداد');
    } finally {
      setIsToggling(false);
    }
  };

  return {
    toggleSavedEvent,
    isToggling,
  };
}
