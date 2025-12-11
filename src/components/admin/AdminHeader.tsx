import Link from 'next/link'
import { Home } from 'lucide-react'

interface AdminHeaderProps {
  locale: string
  user: {
    name?: string | null
    email?: string | null
  }
}

export default function AdminHeader({ locale, user }: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div>
            <h1 className="text-xl font-bold text-gray-900">پنل مدیریت</h1>
            <p className="text-sm text-gray-600">خوش آمدید، {user.name || user.email}</p>
          </div>
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            بازگشت به سایت
          </Link>
        </div>
      </div>
    </header>
  )
}
