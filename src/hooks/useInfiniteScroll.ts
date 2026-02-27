'use client'

import { useRef, useCallback, useEffect, useState } from 'react'

interface UseInfiniteScrollOptions {
  threshold?: number
  rootMargin?: string
}

export function useInfiniteScroll(options: UseInfiniteScrollOptions = {}) {
  const { threshold = 0.1, rootMargin = '100px' } = options
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<(() => Promise<void>) | null>(null)

  const ref = useCallback((node: HTMLElement | null) => {
    if (observerRef.current) observerRef.current.disconnect()
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && loadMoreRef.current) {
          setIsLoading(true)
          loadMoreRef.current().finally(() => setIsLoading(false))
        }
      },
      { threshold, rootMargin }
    )

    if (node) observerRef.current.observe(node)
  }, [hasMore, isLoading, threshold, rootMargin])

  const loadMore = useCallback((fn: () => Promise<void>) => {
    loadMoreRef.current = fn
  }, [])

  return { ref, hasMore, setHasMore, isLoading, loadMore }
}
