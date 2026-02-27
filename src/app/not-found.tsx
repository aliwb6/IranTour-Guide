import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🏛️</div>
        <h1 className="text-6xl font-black text-red-900 mb-4">۴۰۴</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          صفحه مورد نظر یافت نشد
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است.
          می‌توانید به صفحه اصلی بازگردید یا رویدادهای جدید را مرور کنید.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-red-800 to-red-900 text-yellow-200 font-bold hover:shadow-lg transition-shadow"
          >
            بازگشت به خانه
          </Link>
          <Link
            href="/events"
            className="px-8 py-3 rounded-xl border-2 border-red-900 text-red-900 font-bold hover:bg-red-900 hover:text-yellow-200 transition-colors"
          >
            مشاهده رویدادها
          </Link>
        </div>
      </div>
    </div>
  )
}
