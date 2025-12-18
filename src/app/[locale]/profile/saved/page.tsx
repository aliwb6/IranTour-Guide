'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Calendar, MapPin, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSavedEvents, useToggleSavedEvent } from '@/hooks/useSavedEvents';
import moment from 'moment-jalaali';

export default function SavedEventsPage() {
  const { savedEvents, isLoading, error } = useSavedEvents();
  const { toggleSavedEvent } = useToggleSavedEvent();

  const formatPrice = (price: number | null) => {
    if (!price) return 'رایگان';
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const formatDate = (date: Date) => {
    return moment(date).format('jDD jMMMM jYYYY');
  };

  const handleRemove = async (eventSlug: string) => {
    if (!confirm('آیا از حذف این رویداد اطمینان دارید؟')) return;
    await toggleSavedEvent(eventSlug);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center py-12 text-gray-500">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          در حال بارگذاری...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center py-12 text-red-600">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            رویدادهای ذخیره شده
          </h1>
          <div className="flex items-center gap-2 text-gray-600">
            <Heart className="w-5 h-5" />
            <span>{savedEvents?.length || 0} رویداد</span>
          </div>
        </div>

        {!savedEvents || savedEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-6">هنوز رویدادی ذخیره نکرده‌اید</div>
            <Button asChild>
              <Link href="/events">مشاهده رویدادها</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedEvents.map((saved: any) => {
              const event = saved.event;

              return (
                <motion.div
                  key={saved.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Image */}
                  {event.featuredImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={event.featuredImage}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={() => handleRemove(event.slug)}
                        className="absolute top-3 left-3 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                        title="حذف از ذخیره‌شده‌ها"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                      {event.title}
                    </h3>

                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">
                          {formatDate(event.startDate)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">
                          {event.city} - {event.venue}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <Button asChild variant="outline">
                        <Link href={`/events/${event.slug}`}>مشاهده جزئیات</Link>
                      </Button>

                      <div className="text-left">
                        <div className="text-sm text-gray-500">قیمت</div>
                        <div className="text-lg font-bold text-gray-900">
                          {formatPrice(event.basePrice)}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
