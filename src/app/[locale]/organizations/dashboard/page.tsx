import React from 'react'
import Link from 'next/link'
import { Calendar, Eye, Bookmark, Share2, Plus, BarChart3, Edit } from 'lucide-react'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { KPICard } from '@/components/dashboard/KPICard'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { RecentActivity, Activity } from '@/components/dashboard/RecentActivity'
import { Badge } from '@/components/ui/Badge'
import moment from 'moment-jalaali'

async function getDashboardData(organizationId: string) {
  const [events, viewsAgg, savesAgg, sharesAgg] = await Promise.all([
    prisma.event.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        categories: {
          include: { category: true }
        }
      }
    }),
    prisma.event.aggregate({
      where: { organizationId },
      _sum: { viewCount: true }
    }),
    prisma.event.aggregate({
      where: { organizationId },
      _sum: { saveCount: true }
    }),
    prisma.event.aggregate({
      where: { organizationId },
      _sum: { shareCount: true }
    })
  ])

  const activeEventsCount = events.filter(e => e.status === 'APPROVED').length

  // Generate recent activity (simplified version)
  const recentActivity: Activity[] = events.slice(0, 5).map((event, index) => ({
    id: event.id,
    type: event.status === 'APPROVED' ? 'event_approved' :
          event.status === 'REJECTED' ? 'event_rejected' : 'event_published',
    message: event.status === 'APPROVED' ? `رویداد "${event.title}" تأیید شد` :
             event.status === 'REJECTED' ? `رویداد "${event.title}" رد شد` :
             `رویداد "${event.title}" منتشر شد`,
    timestamp: event.createdAt,
    eventTitle: event.title
  }))

  return {
    events,
    totalViews: viewsAgg._sum.viewCount || 0,
    totalSaves: savesAgg._sum.saveCount || 0,
    totalShares: sharesAgg._sum.shareCount || 0,
    activeEventsCount,
    recentActivity
  }
}

const statusLabels = {
  APPROVED: 'تأیید شده',
  PENDING: 'در انتظار',
  REJECTED: 'رد شده'
}

const statusColors = {
  APPROVED: 'bg-green-100 text-green-700 border-green-300',
  PENDING: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  REJECTED: 'bg-red-100 text-red-700 border-red-300'
}

export default async function DashboardPage({
  params
}: {
  params: { locale: string }
}) {
  const session = await auth()

  if (!session || !session.user) {
    redirect(`/${params.locale}/auth/signin`)
  }

  const organization = await prisma.organization.findUnique({
    where: { userId: session.user.id }
  })

  if (!organization) {
    redirect(`/${params.locale}`)
  }

  const dashboardData = await getDashboardData(organization.id)

  const quickActions = [
    {
      label: 'افزودن رویداد جدید',
      href: `/${params.locale}/organizations/dashboard/add-event`,
      icon: Plus,
      color: 'primary' as const
    },
    {
      label: 'مشاهده آمار کامل',
      href: `/${params.locale}/organizations/dashboard/analytics`,
      icon: BarChart3,
      color: 'secondary' as const
    },
    {
      label: 'ویرایش پروفایل',
      href: `/${params.locale}/organizations/dashboard/profile`,
      icon: Edit,
      color: 'accent' as const
    }
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">داشبورد سازمان</h1>
        <p className="text-gray-600">مدیریت رویدادها و مشاهده آمار</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          label="رویدادهای فعال"
          value={dashboardData.activeEventsCount}
          change="+12%"
          icon={Calendar}
          color="blue"
        />
        <KPICard
          label="کل بازدیدها"
          value={dashboardData.totalViews}
          change="+8%"
          icon={Eye}
          color="green"
        />
        <KPICard
          label="ذخیره‌شده"
          value={dashboardData.totalSaves}
          change="+15%"
          icon={Bookmark}
          color="purple"
        />
        <KPICard
          label="اشتراک‌گذاری"
          value={dashboardData.totalShares}
          change="+5%"
          icon={Share2}
          color="orange"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">دسترسی سریع</h2>
        <QuickActions actions={quickActions} />
      </div>

      {/* Recent Events and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Events */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">رویدادهای اخیر</h2>
            <Link
              href={`/${params.locale}/organizations/dashboard/events`}
              className="text-sm text-[#A01C1C] hover:underline"
            >
              مشاهده همه
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {dashboardData.events.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {dashboardData.events.map((event) => (
                  <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate mb-1">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">{event.city}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span>{moment(event.startDate).format('jYYYY/jMM/jDD')}</span>
                          <span>{event.viewCount.toLocaleString('fa-IR')} بازدید</span>
                        </div>
                      </div>
                      <Badge className={`${statusColors[event.status]} px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap`}>
                        {statusLabels[event.status]}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p>هنوز رویدادی ثبت نکرده‌اید</p>
                <Link
                  href={`/${params.locale}/organizations/dashboard/add-event`}
                  className="inline-block mt-4 px-6 py-2 bg-[#A01C1C] text-white rounded-lg hover:bg-[#7a1515] transition-colors"
                >
                  افزودن اولین رویداد
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">فعالیت‌های اخیر</h2>
          <RecentActivity activities={dashboardData.recentActivity} />
        </div>
      </div>
    </div>
  )
}
