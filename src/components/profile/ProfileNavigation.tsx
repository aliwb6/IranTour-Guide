'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Bookmark, Tag, MapPin, Settings } from 'lucide-react'

const navigationItems = [
  { href: '/profile', label: 'پروفایل', icon: User },
  { href: '/profile/saved', label: 'رویدادهای ذخیره‌شده', icon: Bookmark },
  { href: '/profile/followed-topics', label: 'موضوعات دنبال‌شده', icon: Tag },
  { href: '/profile/followed-cities', label: 'شهرهای دنبال‌شده', icon: MapPin },
  { href: '/profile/settings', label: 'تنظیمات', icon: Settings },
]

export const ProfileNavigation: React.FC = () => {
  const pathname = usePathname()

  return (
    <nav className="kashi-card p-4">
      <ul className="space-y-2">
        {navigationItems.map((item, index) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-gold to-yellow-400 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </motion.div>
              </Link>
            </motion.li>
          )
        })}
      </ul>
    </nav>
  )
}
