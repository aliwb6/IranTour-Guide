'use client'

import { useState } from 'react'
import { Mail, Send, Check, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NewsletterFormProps {
  variant?: 'inline' | 'card'
  className?: string
}

export function NewsletterForm({ variant = 'inline', className }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={cn('flex items-center gap-2 text-green-600', className)}>
        <Check className="w-5 h-5" />
        <span className="font-bold">با موفقیت ثبت شد!</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex gap-2', className)}>
      <div className="relative flex-1">
        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ایمیل شما..."
          required
          className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm hover:shadow-md transition-shadow disabled:opacity-50 flex items-center gap-2"
      >
        {status === 'loading' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
        عضویت
      </button>
    </form>
  )
}
