'use client'

import { useState } from 'react'
import { Share2, Send, MessageCircle, Link2, Check } from 'lucide-react'

interface ShareButtonsProps {
  title: string
  url: string
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {}
    }
  }

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)

    const shareUrls: Record<string, string> = {
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    }

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const input = document.createElement('input')
      input.value = url
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <button
          onClick={handleNativeShare}
          className="flex-1 min-w-[100px] px-4 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold transition flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          <span className="text-sm">اشتراک‌گذاری</span>
        </button>
      )}

      <button
        onClick={() => handleShare('telegram')}
        className="flex-1 min-w-[100px] px-4 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4" />
        <span className="text-sm">تلگرام</span>
      </button>

      <button
        onClick={() => handleShare('whatsapp')}
        className="flex-1 min-w-[100px] px-4 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition flex items-center justify-center gap-2"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="text-sm">واتساپ</span>
      </button>

      <button
        onClick={handleCopyLink}
        className={`w-full px-4 py-3 rounded-xl border-2 font-bold transition flex items-center justify-center gap-2 ${
          copied
            ? 'border-green-500 bg-green-50 text-green-700'
            : 'border-red-900 text-red-900 hover:bg-red-900 hover:text-yellow-200'
        }`}
      >
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
        <span className="text-sm">{copied ? 'کپی شد!' : 'کپی لینک'}</span>
      </button>
    </div>
  )
}
