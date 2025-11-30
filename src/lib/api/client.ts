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
