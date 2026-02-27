interface SuggestEventsInput {
  bio: string
  startDate: string
  endDate: string
  cities: string[]
}

interface SuggestEventsResult {
  events: Array<{
    id: string
    title: string
    matchPercentage: number
    reason: string
  }>
  itinerary: string
  reasons: Record<string, string>
}

export async function suggestEvents(input: SuggestEventsInput): Promise<SuggestEventsResult> {
  const response = await fetch('/api/ai/suggest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    throw new Error('Failed to get AI suggestions')
  }

  const data = await response.json()
  return data.data
}

export async function improveDescription(text: string): Promise<string> {
  const response = await fetch('/api/ai/improve-desc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description: text }),
  })

  if (!response.ok) {
    throw new Error('Failed to improve description')
  }

  const data = await response.json()
  return data.data.improved
}

export async function categorizeEvent(
  title: string,
  description: string
): Promise<{ type: string; style: string; categories: string[] }> {
  const response = await fetch('/api/ai/categorize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  })

  if (!response.ok) {
    throw new Error('Failed to categorize event')
  }

  const data = await response.json()
  return data.data
}
