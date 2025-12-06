// src/app/events/[slug]/not-found.tsx

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center kashi-card p-12 max-w-2xl mx-auto">
        <p className="text-8xl mb-6">😔</p>
        <h1 className="text-4xl md:text-5xl font-black text-red-900 mb-4">رویداد پیدا نشد</h1>
        <p className="text-xl text-gray-700 mb-8 leading-relaxed font-bold">
          متأسفانه رویدادی با این مشخصات یافت نشد. شاید حذف شده یا آدرس اشتباه است.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/events" className="deep-persian-btn px-8 py-4 font-black">
            🎭 مشاهده همه رویدادها
          </Link>
          <Link
            href="/"
            className="px-8 py-4 rounded-xl border-2 border-red-900 text-red-900 font-black hover:bg-red-900 hover:text-yellow-200 transition"
          >
            🏠 بازگشت به خانه
          </Link>
        </div>
      </div>
    </div>
  )
}
