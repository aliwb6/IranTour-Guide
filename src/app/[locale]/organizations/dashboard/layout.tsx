import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Home, CheckCircle, Menu } from 'lucide-react'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const session = await auth()

  // Check if user is authenticated
  if (!session || !session.user) {
    redirect(`/${params.locale}/auth/signin`)
  }

  // Check if user is organizer or admin
  if (session.user.role !== 'ORGANIZER' && session.user.role !== 'ADMIN') {
    redirect(`/${params.locale}`)
  }

  // Get organization data
  const organization = await prisma.organization.findUnique({
    where: { userId: session.user.id }
  })

  // If organizer doesn't have an organization yet, redirect to create one
  if (!organization && session.user.role === 'ORGANIZER') {
    // For now, we'll create a default message, in a real app you'd redirect to create org page
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">ایجاد سازمان</h1>
          <p className="text-gray-600 mb-6">
            برای دسترسی به داشبورد، ابتدا باید اطلاعات سازمان خود را تکمیل کنید.
          </p>
          <Link
            href={`/${params.locale}`}
            className="inline-block px-6 py-3 bg-[#A01C1C] text-white rounded-lg hover:bg-[#7a1515] transition-colors"
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      {/* Top Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Organization Info */}
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                {organization?.logo ? (
                  <Image
                    src={organization.logo}
                    alt={organization.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-bold">
                    {organization?.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h2 className="font-bold text-gray-900">{organization?.name}</h2>
                {organization?.isVerified && (
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    <span>تأیید شده</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link
                href={`/${params.locale}`}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">بازگشت به سایت</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <DashboardSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Navigation - Bottom Drawer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="grid grid-cols-5 gap-1 p-2">
          {/* Mobile nav items would go here - simplified for now */}
          <Link
            href={`/${params.locale}/organizations/dashboard`}
            className="flex flex-col items-center justify-center p-2 text-xs text-gray-600 hover:text-[#A01C1C]"
          >
            <Menu className="w-5 h-5 mb-1" />
            <span>منو</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
