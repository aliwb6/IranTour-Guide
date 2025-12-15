'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/events?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
      <div className="kashi-search flex items-center gap-3">
        <input
          type="text"
          placeholder="جستجوی رویداد، شهر، موضوع..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <button
          type="submit"
          className="deep-persian-btn px-6 py-3 text-sm md:text-base flex items-center gap-2 shrink-0"
          aria-label="Search"
        >
          <span>🔍</span>
          <span>جستجو</span>
        </button>
      </div>
    </form>
  )
}
