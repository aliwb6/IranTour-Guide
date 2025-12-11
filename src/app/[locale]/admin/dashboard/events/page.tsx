import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import AdminEventsTable from '@/components/admin/AdminEventsTable'

export default async function AdminEventsPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const session = await auth()

  if (!session || session.user.role !== 'ADMIN') {
    redirect(`/${locale}/auth/signin`)
  }

  const events = await prisma.event.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      organization: true,
      categories: {
        include: { category: true }
      }
    }
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">مدیریت رویدادها</h1>
        <p className="text-gray-600">تأیید، رد و مدیریت رویدادها</p>
      </div>

      <AdminEventsTable events={events} locale={locale} />
    </div>
  )
}
