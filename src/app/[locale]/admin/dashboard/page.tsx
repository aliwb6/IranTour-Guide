import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { KPICard } from '@/components/dashboard/KPICard'
import { Calendar, Users, Building2, Eye } from 'lucide-react'

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const session = await auth()

  if (!session || session.user.role !== 'ADMIN') {
    redirect(`/${locale}/auth/signin`)
  }

  const [totalEvents, pendingEvents, totalUsers, totalOrganizations, totalViews] =
    await Promise.all([
      prisma.event.count(),
      prisma.event.count({ where: { status: 'PENDING' } }),
      prisma.user.count(),
      prisma.organization.count(),
      prisma.event.aggregate({ _sum: { viewCount: true } }),
    ])

  const kpis = [
    {
      label: 'کل رویدادها',
      value: totalEvents,
      icon: Calendar,
      color: 'blue' as const,
    },
    {
      label: 'در انتظار تأیید',
      value: pendingEvents,
      icon: Calendar,
      color: 'orange' as const,
    },
    {
      label: 'کاربران',
      value: totalUsers,
      icon: Users,
      color: 'green' as const,
    },
    {
      label: 'سازمان‌ها',
      value: totalOrganizations,
      icon: Building2,
      color: 'purple' as const,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">داشبورد مدیریت</h1>
        <p className="text-gray-600">نمای کلی سیستم</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">خلاصه فعالیت‌ها</h2>
        <p className="text-gray-600">
          کل بازدیدها:{' '}
          <span className="font-bold">
            {(totalViews._sum.viewCount || 0).toLocaleString('fa-IR')}
          </span>
        </p>
      </div>
    </div>
  )
}
