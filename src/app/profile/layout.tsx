import React from 'react'
import { UserInfoCard } from '@/components/profile/UserInfoCard'
import { ProfileNavigation } from '@/components/profile/ProfileNavigation'

// Mock user data - Replace with real authentication when NextAuth is configured
const mockUser = {
  id: 'user-1',
  name: 'کاربر نمونه',
  email: 'user@example.com',
  image: null,
  createdAt: '2024-03-01T10:00:00.000Z'
}

export default function ProfileLayout({
  children
}: {
  children: React.ReactNode
}) {
  // TODO: Replace with real authentication
  // const session = await getServerSession(authOptions)
  // if (!session) {
  //   redirect('/auth/signin')
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden md:block">
            <UserInfoCard user={mockUser} />
            <ProfileNavigation />
          </aside>

          {/* Main Content */}
          <main className="md:col-span-3">
            {children}
          </main>
        </div>

        {/* Mobile: User Info at Top */}
        <div className="md:hidden mb-6">
          <UserInfoCard user={mockUser} />
        </div>
      </div>
    </div>
  )
}
