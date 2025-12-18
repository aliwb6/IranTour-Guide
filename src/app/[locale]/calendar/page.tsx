import { Suspense } from 'react';
import { Metadata } from 'next';
import CalendarClient from '@/components/calendar/CalendarClient';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'تقویم رویدادها | IranTour Guide',
  description: 'مشاهده تمام رویدادهای ایران در تقویم',
};

async function getCalendarEvents() {
  const events = await prisma.event.findMany({
    where: {
      status: 'APPROVED',
      startDate: {
        gte: new Date(new Date().getFullYear(), 0, 1), // Start of current year
      },
    },
    select: {
      id: true,
      slug: true,
      title: true,
      startDate: true,
      endDate: true,
      city: true,
      type: true,
      style: true,
      featuredImage: true,
      basePrice: true,
    },
    orderBy: {
      startDate: 'asc',
    },
  });

  return events;
}

export default async function CalendarPage() {
  const events = await getCalendarEvents();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              تقویم رویدادها
            </h1>
            <p className="text-lg text-gray-600">
              مشاهده و برنامه‌ریزی رویدادهای ایران
            </p>
          </div>

          <Suspense fallback={<CalendarSkeleton />}>
            <CalendarClient events={events} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function CalendarSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded w-full"></div>
        <div className="h-96 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
}
