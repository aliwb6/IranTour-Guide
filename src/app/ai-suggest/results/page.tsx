'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ResultsDisplay } from '@/components/ai/ResultsDisplay'
import { SuggestionLoading } from '@/components/ai/SuggestionLoading'
import { SuggestionError } from '@/components/ai/SuggestionError'

function ResultsContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    if (!id) {
      setError('شناسه پیشنهاد یافت نشد')
      setLoading(false)
      return
    }

    // Fetch suggestion data
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/ai/suggest?id=${id}`)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'خطا در دریافت پیشنهادات')
        }

        const result = await response.json()
        setData(result)
        setLoading(false)
      } catch (err: any) {
        console.error('Fetch error:', err)
        setError(err.message || 'خطا در دریافت پیشنهادات')
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return <SuggestionLoading />
  }

  if (error || !data) {
    return (
      <SuggestionError
        error={error || 'پیشنهادی یافت نشد'}
        onBack={() => window.location.href = '/ai-suggest/form'}
      />
    )
  }

  return (
    <ResultsDisplay
      userName={data.userName}
      summary={data.summary}
      suggestions={data.suggestions}
      itinerary={data.itinerary}
      tips={data.tips}
    />
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<SuggestionLoading />}>
      <ResultsContent />
    </Suspense>
  )
}
