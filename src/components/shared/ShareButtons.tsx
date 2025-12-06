// src/components/shared/ShareButtons.tsx
'use client'

interface ShareButtonsProps {
  title: string
  url: string
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url)
    alert('لینک کپی شد! ✅')
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleShare('telegram')}
        className="flex-1 min-w-[100px] px-4 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition flex items-center justify-center gap-2"
      >
        <span className="text-lg">✈️</span>
        <span className="text-sm">تلگرام</span>
      </button>

      <button
        onClick={() => handleShare('whatsapp')}
        className="flex-1 min-w-[100px] px-4 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition flex items-center justify-center gap-2"
      >
        <span className="text-lg">💬</span>
        <span className="text-sm">واتساپ</span>
      </button>

      <button
        onClick={handleCopyLink}
        className="w-full px-4 py-3 rounded-xl border-2 border-red-900 text-red-900 hover:bg-red-900 hover:text-yellow-200 font-bold transition flex items-center justify-center gap-2"
      >
        <span className="text-lg">🔗</span>
        <span className="text-sm">کپی لینک</span>
      </button>
    </div>
  )
}
