import { Suspense } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { prisma } from '@/lib/prisma';

// Dynamically import map
const MapClient = dynamic(() => import('@/components/map/MapClient'), {
  loading: () => <MapSkeleton />,
});

export const metadata: Metadata = {
  title: 'نقشه رویدادها | IranTour Guide',
  description: 'مشاهده رویدادهای ایران روی نقشه',
};

async function getMapEvents() {
  const events = await prisma.event.findMany({
    where: {
      status: 'APPROVED',
      latitude: { not: null },
      longitude: { not: null },
    },
    select: {
      id: true,
      slug: true,
      title: true,
      city: true,
      venue: true,
      latitude: true,
      longitude: true,
      startDate: true,
      type: true,
      style: true,
      featuredImage: true,
      basePrice: true,
      shortDescription: true,
    },
  });

  // Filter out any events with null coordinates and assert types
  return events.filter(
    (event): event is typeof event & { latitude: number; longitude: number } =>
      event.latitude !== null && event.longitude !== null
  );
}

export default async function MapPage() {
  const events = await getMapEvents();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              نقشه رویدادها
            </h1>
            <p className="text-lg text-gray-600">
              مشاهده رویدادها روی نقشه ایران
            </p>
          </div>

          <Suspense fallback={<MapSkeleton />}>
            <MapClient events={events} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function MapSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="h-[600px] bg-gray-200 animate-pulse flex items-center justify-center">
        <div className="text-gray-500">در حال بارگذاری نقشه...</div>
      </div>
    </div>
  );
}
