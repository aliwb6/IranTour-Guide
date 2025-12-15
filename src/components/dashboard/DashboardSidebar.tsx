'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LucideIcon, LayoutDashboard, Calendar, Plus, BarChart3, Building2 } from 'lucide-react'

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

const defaultNavItems: NavItem[] = [
  {
    href: '/organizations/dashboard',
    label: 'داشبورد',
    icon: LayoutDashboard,
  },
  {
    href: '/organizations/dashboard/events',
    label: 'رویدادهای من',
    icon: Calendar,
  },
  {
    href: '/organizations/dashboard/add-event',
    label: 'افزودن رویداد',
    icon: Plus,
  },
  {
    href: '/organizations/dashboard/analytics',
    label: 'آمار و گزارش',
    icon: BarChart3,
  },
  {
    href: '/organizations/dashboard/profile',
    label: 'پروفایل سازمان',
    icon: Building2,
  },
]

interface DashboardSidebarProps {
  locale: string
  navItems?: NavItem[]
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  locale,
  navItems = defaultNavItems,
}) => {
  const pathname = usePathname()

  const isActive = (href: string) => {
    const fullHref = `/${locale}${href}`
    if (href === '/organizations/dashboard') {
      return pathname === fullHref
    }
    return pathname?.startsWith(fullHref)
  }

  return (
    <nav className="space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon
        const fullHref = `/${locale}${item.href}`
        const active = isActive(item.href)

        return (
          <Link
            key={item.href}
            href={fullHref}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              active
                ? 'bg-gradient-to-r from-[#A01C1C] to-[#7a1515] text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
