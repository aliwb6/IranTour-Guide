'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Calendar,
  Users,
  Building2,
  MessageSquare,
  Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminSidebarProps {
  locale: string
}

const navItems = [
  {
    href: '/admin/dashboard',
    label: 'داشبورد',
    icon: LayoutDashboard
  },
  {
    href: '/admin/dashboard/events',
    label: 'مدیریت رویدادها',
    icon: Calendar
  },
  {
    href: '/admin/dashboard/users',
    label: 'مدیریت کاربران',
    icon: Users
  },
  {
    href: '/admin/dashboard/organizations',
    label: 'مدیریت سازمان‌ها',
    icon: Building2
  },
  {
    href: '/admin/dashboard/comments',
    label: 'مدیریت نظرات',
    icon: MessageSquare
  },
  {
    href: '/admin/dashboard/settings',
    label: 'تنظیمات',
    icon: Settings
  }
]

export default function AdminSidebar({ locale }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <nav className="space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon
        const fullHref = `/${locale}${item.href}`
        const isActive = pathname === fullHref

        return (
          <Link
            key={item.href}
            href={fullHref}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
              isActive
                ? "bg-[#A01C1C] text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
