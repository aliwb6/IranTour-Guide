import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import BookingPageClient from '@/components/booking/BookingPageClient';

interface BookingPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: BookingPageProps): Promise<Metadata> {
  const { slug } = await params;

  const event = await prisma.event.findUnique({
    where: { slug },
    select: { title: true },
  });

  if (!event) return { title: 'رویداد یافت نشد' };

  return {
    title: `رزرو ${event.title} | IranTour Guide`,
    description: `رزرو آنلاین رویداد ${event.title}`,
  };
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { slug } = await params;

  const event = await prisma.event.findUnique({
    where: { slug, status: 'APPROVED' },
    select: {
      id: true,
      slug: true,
      title: true,
      startDate: true,
      endDate: true,
      city: true,
      venue: true,
      basePrice: true,
      availableSpots: true,
      featuredImage: true,
      shortDescription: true,
      isBookable: true,
    },
  });

  if (!event || !event.isBookable) {
    notFound();
  }

  return <BookingPageClient event={event} />;
}
