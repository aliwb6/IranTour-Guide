'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface SaveButtonProps {
  eventId: string
  initialSaved?: boolean
  onToggle?: (saved: boolean) => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function SaveButton({ eventId, initialSaved = false, onToggle, className, size = 'md' }: SaveButtonProps) {
  const [saved, setSaved] = useState(initialSaved)
  const [isAnimating, setIsAnimating] = useState(false)

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const buttonSizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  }

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const newState = !saved
    setSaved(newState)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)
    onToggle?.(newState)

    try {
      await fetch('/api/saved-events', {
        method: newState ? 'POST' : 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId }),
      })
    } catch {
      setSaved(!newState)
    }
  }

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={handleClick}
      className={cn(
        'rounded-full transition-colors',
        saved
          ? 'bg-red-50 text-red-500 hover:bg-red-100'
          : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600',
        buttonSizeClasses[size],
        className
      )}
      aria-label={saved ? 'حذف از ذخیره‌شده‌ها' : 'ذخیره رویداد'}
    >
      <Heart
        className={cn(
          sizeClasses[size],
          'transition-all',
          saved && 'fill-current',
          isAnimating && 'scale-125'
        )}
      />
    </motion.button>
  )
}
