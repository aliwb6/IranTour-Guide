'use client'

import Link from 'next/link'
import { X, Home, Calendar, MapPin, Sparkles, PlusCircle, BookOpen, Newspaper, LogIn, UserPlus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { href: '/', label: 'خانه', icon: Home },
  { href: '/events', label: 'رویدادها', icon: Calendar },
  { href: '/calendar', label: 'تقویم', icon: Calendar },
  { href: '/map', label: 'نقشه', icon: MapPin },
  { href: '/ai-suggest', label: 'پیشنهاد هوشمند', icon: Sparkles },
  { href: '/submit-event', label: 'افزودن رویداد', icon: PlusCircle },
  { href: '/cities', label: 'شهرها', icon: MapPin },
  { href: '/blog', label: 'مجله', icon: Newspaper },
]

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 w-3/4 max-w-sm bg-white shadow-2xl lg:hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏛️</span>
            <span className="font-bold text-red-900">IranTour Guide</span>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors font-bold"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t space-y-3">
          <Link
            href="/auth/signin"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:border-amber-500 transition-colors"
          >
            <LogIn className="w-5 h-5" />
            ورود
          </Link>
          <Link
            href="/auth/signup"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold"
          >
            <UserPlus className="w-5 h-5" />
            ثبت‌نام
          </Link>
        </div>
      </div>
    </>
  )
}
