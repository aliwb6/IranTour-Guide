import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import BookingDetailsClient from '@/components/booking/BookingDetailsClient';

interface BookingDetailsPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({ params }: BookingDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id },
    select: { bookingCode: true },
  });

  if (!booking) return { title: 'رزرو یافت نشد' };

  return {
    title: `رزرو ${booking.bookingCode} | IranTour Guide`,
    description: `جزئیات رزرو شما`,
  };
}

export default async function BookingDetailsPage({ params }: BookingDetailsPageProps) {
  const { id } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      event: {
        select: {
          title: true,
          slug: true,
          startDate: true,
          endDate: true,
          city: true,
          venue: true,
          featuredImage: true,
        },
      },
    },
  });

  if (!booking) {
    notFound();
  }

  return <BookingDetailsClient booking={booking} />;
}
