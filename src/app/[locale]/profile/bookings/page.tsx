'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  ChevronLeft,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookings } from '@/hooks/useBookings';
import moment from 'moment-jalaali';

export default function MyBookingsPage() {
  const { bookings, isLoading, error } = useBookings();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const formatDate = (date: Date) => {
    return moment(date).format('jYYYY/jMM/jDD');
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return {
          label: 'تأیید شده',
          icon: CheckCircle,
          color: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
        };
      case 'PENDING':
        return {
          label: 'در انتظار پرداخت',
          icon: Clock,
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          border: 'border-amber-200',
        };
      case 'CANCELLED':
        return {
          label: 'لغو شده',
          icon: XCircle,
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200',
        };
      default:
        return {
          label: status,
          icon: AlertCircle,
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
        };
    }
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          رزروهای من
        </h1>

        {!bookings || bookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-6">هنوز رزروی ندارید</div>
            <Button asChild>
              <Link href="/events">مشاهده رویدادها</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking: any) => {
              const statusConfig = getStatusConfig(booking.status);
              const StatusIcon = statusConfig.icon;

              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row gap-6 p-6">
                    {/* Event Image */}
                    {booking.event?.featuredImage && (
                      <div className="w-full md:w-48 h-48 relative flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={booking.event.featuredImage}
                          alt={booking.event.title || ''}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {booking.event?.title || 'رویداد'}
                          </h3>
                          <p className="text-sm text-gray-500">
                            شماره رزرو: {booking.bookingNumber}
                          </p>
                        </div>

                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig.bg} ${statusConfig.border} border`}>
                          <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                          <span className={`text-sm font-medium ${statusConfig.color}`}>
                            {statusConfig.label}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">
                            {formatDate(booking.event?.startDate)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">{booking.event?.city}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">
                            {booking.totalParticipants} نفر
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <Button variant="outline" asChild>
                          <Link href={`/bookings/${booking.id}`}>
                            جزئیات
                            <ChevronLeft className="w-4 h-4 mr-2" />
                          </Link>
                        </Button>

                        <div className="text-left">
                          <div className="text-sm text-gray-500">مبلغ کل</div>
                          <div className="text-xl font-bold text-gray-900">
                            {formatPrice(booking.totalPrice)} تومان
                          </div>
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
