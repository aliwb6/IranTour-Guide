'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Users, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookingForm from '@/components/booking/BookingForm';
import { useCreateBooking } from '@/hooks/useBooking';
import type { CreateBookingInput } from '@/types/booking';
import moment from 'moment-jalaali';

interface BookingPageClientProps {
  event: {
    id: string;
    slug: string;
    title: string;
    startDate: Date;
    endDate: Date;
    city: string;
    venue: string;
    basePrice: number | null;
    availableSpots: number | null;
    featuredImage: string | null;
    shortDescription: string;
  };
}

export default function BookingPageClient({ event }: BookingPageClientProps) {
  const router = useRouter();
  const { createBooking, loading, error } = useCreateBooking();
  const [showForm, setShowForm] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const formatDate = (date: Date) => {
    return moment(date).format('jDD jMMMM jYYYY');
  };

  const handleSubmit = async (data: CreateBookingInput) => {
    try {
      const result = await createBooking(data);

      if (result?.id) {
        // Redirect to booking details
        router.push(`/bookings/${result.id}`);
      }
    } catch (err) {
      console.error('Booking error:', err);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  // Check if bookable
  const isAvailable = event.availableSpots === null || event.availableSpots > 0;
  const hasPrice = event.basePrice !== null && event.basePrice > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            بازگشت به صفحه رویداد
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Booking Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl shadow-lg p-6 md:p-8"
            >
              <h1 className="text-3xl font-bold text-foreground mb-6">
                رزرو رویداد
              </h1>

              {!isAvailable ? (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-destructive mb-1">ظرفیت تکمیل</h3>
                      <p className="text-sm text-muted-foreground">
                        متأسفانه ظرفیت این رویداد به اتمام رسیده است.
                      </p>
                    </div>
                  </div>
                </div>
              ) : !hasPrice ? (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-amber-900 mb-1">اطلاعات قیمت موجود نیست</h3>
                      <p className="text-sm text-amber-700">
                        برای اطلاعات بیشتر با برگزارکننده تماس بگیرید.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <BookingForm
                  eventId={event.id}
                  eventTitle={event.title}
                  eventDate={event.startDate}
                  pricePerPerson={event.basePrice || 0}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                />
              )}
            </motion.div>
          </div>

          {/* Sidebar - Event Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card rounded-xl shadow-lg p-6 sticky top-24"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">
                خلاصه رویداد
              </h2>

              {/* Event Image */}
              {event.featuredImage && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={event.featuredImage}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Event Title */}
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {event.title}
              </h3>

              {/* Event Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 text-sm">
                  <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground mb-1">تاریخ برگزاری</p>
                    <p className="font-medium text-foreground">
                      {formatDate(event.startDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground mb-1">محل برگزاری</p>
                    <p className="font-medium text-foreground">{event.city}</p>
                    <p className="text-muted-foreground text-xs">{event.venue}</p>
                  </div>
                </div>

                {event.availableSpots !== null && (
                  <div className="flex items-start gap-3 text-sm">
                    <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground mb-1">ظرفیت باقیمانده</p>
                      <p className="font-medium text-foreground">
                        {event.availableSpots} نفر
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Price */}
              {hasPrice && (
                <div className="border-t pt-4 mb-4">
                  <p className="text-sm text-muted-foreground mb-1">قیمت هر نفر</p>
                  <p className="text-2xl font-bold text-primary">
                    {formatPrice(event.basePrice!)} تومان
                  </p>
                </div>
              )}

              {/* Short Description */}
              <div className="text-sm text-muted-foreground">
                <p className="line-clamp-3">
                  {event.shortDescription}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
