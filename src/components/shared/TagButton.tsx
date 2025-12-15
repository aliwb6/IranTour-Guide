'use client'

import { useRouter } from 'next/navigation'

interface TagButtonProps {
  children: React.ReactNode
  tag?: string
}

export function TagButton({ children, tag }: TagButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (tag) {
      router.push(`/events?tag=${encodeURIComponent(tag)}`)
    }
  }

  return (
    <button className="deep-tag" onClick={handleClick}>
      {children}
    </button>
  )
}
