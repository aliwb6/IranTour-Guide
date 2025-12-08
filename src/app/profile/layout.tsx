import React from 'react'
import { redirect } from 'next/navigation'
import { UserInfoCard } from '@/components/profile/UserInfoCard'
import { ProfileNavigation } from '@/components/profile/ProfileNavigation'
import { auth } from '@/lib/auth'

export default async function ProfileLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session || !session.user) {
    redirect('/auth/signin')
  }

  const user = {
    id: session.user.id!,
    name: session.user.name!,
    email: session.user.email!,
    image: session.user.image || null,
    createdAt: new Date().toISOString() // Will be added later
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden md:block">
            <UserInfoCard user={user} />
            <ProfileNavigation />
          </aside>

          {/* Main Content */}
          <main className="md:col-span-3">
            {children}
          </main>
        </div>

        {/* Mobile: User Info at Top */}
        <div className="md:hidden mb-6">
          <UserInfoCard user={user} />
        </div>
      </div>
    </div>
  )
}
