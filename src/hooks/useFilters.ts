'use client'

import { useState, useCallback, useMemo } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import type { FilterState, EventType, EventStyle } from '@/types'

const defaultFilters: FilterState = {
  cities: [],
  types: [],
  styles: [],
  categories: [],
  dateRange: {},
  search: '',
}

export function useFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const filters: FilterState = useMemo(() => ({
    cities: searchParams.getAll('city'),
    types: searchParams.getAll('type') as EventType[],
    styles: searchParams.getAll('style') as EventStyle[],
    categories: searchParams.getAll('category'),
    dateRange: {
      start: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined,
      end: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined,
    },
    search: searchParams.get('search') || '',
  }), [searchParams])

  const updateURL = useCallback((newFilters: FilterState) => {
    const params = new URLSearchParams()
    newFilters.cities.forEach(c => params.append('city', c))
    newFilters.types.forEach(t => params.append('type', t))
    newFilters.styles.forEach(s => params.append('style', s))
    newFilters.categories.forEach(cat => params.append('category', cat))
    if (newFilters.dateRange.start) params.set('startDate', newFilters.dateRange.start.toISOString())
    if (newFilters.dateRange.end) params.set('endDate', newFilters.dateRange.end.toISOString())
    if (newFilters.search) params.set('search', newFilters.search)
    router.push(`${pathname}?${params.toString()}`)
  }, [router, pathname])

  const setFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    const newFilters = { ...filters, [key]: value }
    updateURL(newFilters)
  }, [filters, updateURL])

  const clearAll = useCallback(() => {
    updateURL(defaultFilters)
  }, [updateURL])

  const activeFilterCount = useMemo(() => {
    return filters.cities.length + filters.types.length + filters.styles.length + filters.categories.length + (filters.dateRange.start ? 1 : 0) + (filters.search ? 1 : 0)
  }, [filters])

  return { filters, setFilter, clearAll, activeFilterCount }
}
