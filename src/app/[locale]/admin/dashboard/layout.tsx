import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export default async function AdminDashboardLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const session = await auth()

  if (!session || session.user.role !== 'ADMIN') {
    redirect(`/${locale}/auth/signin`)
  }

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      <AdminHeader locale={locale} user={session.user} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <AdminSidebar locale={locale} />
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
