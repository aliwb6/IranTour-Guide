import { Suspense } from 'react';
import Link from 'next/link';
import { User, BookmarkCheck, Heart, Settings } from 'lucide-react';

const navItems = [
  {
    href: '/profile',
    label: 'پروفایل من',
    icon: User,
  },
  {
    href: '/profile/bookings',
    label: 'رزروهای من',
    icon: BookmarkCheck,
  },
  {
    href: '/profile/saved',
    label: 'ذخیره‌شده‌ها',
    icon: Heart,
  },
  {
    href: '/profile/settings',
    label: 'تنظیمات',
    icon: Settings,
  },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors text-gray-700 hover:text-blue-600"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Suspense fallback={<div className="text-center py-12">در حال بارگذاری...</div>}>
                {children}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
