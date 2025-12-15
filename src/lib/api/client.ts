export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'API request failed' }))
    throw new Error(error.message || `HTTP Error: ${response.status}`)
  }

  return response.json()
}

// Helper function to build query string
function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value))
    }
  })
  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

export const api = {
  get: <T>(url: string, options?: RequestInit) =>
    fetcher<T>(url, { ...options, method: 'GET' }),

  post: <T>(url: string, data?: any, options?: RequestInit) =>
    fetcher<T>(url, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T>(url: string, data?: any, options?: RequestInit) =>
    fetcher<T>(url, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: <T>(url: string, data?: any, options?: RequestInit) =>
    fetcher<T>(url, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(url: string, options?: RequestInit) =>
    fetcher<T>(url, { ...options, method: 'DELETE' }),
}

// Typed API endpoints
export const apiEndpoints = {
  // Events
  events: {
    list: (params?: Record<string, any>) =>
      api.get<any>(`/api/events${params ? buildQueryString(params) : ''}`),
    get: (slug: string) =>
      api.get<any>(`/api/events/${slug}`),
    create: (data: any) =>
      api.post<any>('/api/events', data),
    update: (slug: string, data: any) =>
      api.put<any>(`/api/events/${slug}`, data),
    delete: (slug: string) =>
      api.delete<any>(`/api/events/${slug}`),
  },

  // Bookings
  bookings: {
    list: () =>
      api.get<any>('/api/bookings'),
    get: (id: string) =>
      api.get<any>(`/api/bookings/${id}`),
    create: (data: any) =>
      api.post<any>('/api/bookings', data),
    update: (id: string, data: any) =>
      api.patch<any>(`/api/bookings/${id}`, data),
    cancel: (id: string) =>
      api.delete<any>(`/api/bookings/${id}`),
  },

  // Reviews
  reviews: {
    list: (eventId: string) =>
      api.get<any>(`/api/reviews?eventId=${eventId}`),
    create: (data: any) =>
      api.post<any>('/api/reviews', data),
  },

  // Saved Events
  savedEvents: {
    list: () =>
      api.get<any>('/api/saved-events'),
    toggle: (eventSlug: string) =>
      api.post<any>('/api/saved-events', { eventSlug }),
    check: (eventSlug: string) =>
      api.get<any>(`/api/saved-events?eventSlug=${eventSlug}`),
  },
}
