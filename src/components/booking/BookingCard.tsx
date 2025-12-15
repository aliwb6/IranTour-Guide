'use client'

import Link from 'next/link'
import {
  Calendar,
  MapPin,
  Users,
  CreditCard,
  Eye,
  Download,
  XCircle,
  MoreVertical,
} from 'lucide-react'
import moment from 'moment-jalaali'
import type { Booking } from '@/types/booking'
import { Button } from '@/components/ui/button'
import BookingStatusBadge from './BookingStatusBadge'

interface BookingCardProps {
  booking: Booking
  onView?: (bookingId: string) => void
  onCancel?: (bookingId: string) => void
  onDownload?: (bookingId: string) => void
  showActions?: boolean
}

export default function BookingCard({
  booking,
  onView,
  onCancel,
  onDownload,
  showActions = true,
}: BookingCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price)
  }

  const formatDate = (date: Date) => {
    return moment(date).format('jYYYY/jMM/jDD')
  }

  const formatDateTime = (date: Date) => {
    return moment(date).format('jYYYY/jMM/jDD - HH:mm')
  }

  const canCancel = booking.status === 'PENDING' || booking.status === 'CONFIRMED'

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1 text-right">
              {booking.eventTitle}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 justify-end">
              <span>{formatDate(booking.eventDate)}</span>
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <BookingStatusBadge status={booking.status} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Booking Code */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-primary text-lg">{booking.bookingCode}</span>
          </div>
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            کد رزرو:
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Participants */}
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-700">{booking.totalParticipants}</span>
              <span className="text-sm text-blue-600">نفر</span>
            </div>
            <div className="text-sm text-gray-600 flex items-center gap-1">
              <Users className="w-4 h-4" />
              شرکت‌کنندگان
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
            <div className="flex flex-col items-start">
              <span className="font-bold text-green-700">{formatPrice(booking.finalPrice)}</span>
              <span className="text-xs text-green-600">تومان</span>
            </div>
            <div className="text-sm text-gray-600">مبلغ کل</div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-right space-y-1 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">
              {booking.firstName} {booking.lastName}
            </span>
          </p>
          <p className="text-xs text-gray-500" dir="ltr">
            {booking.phone}
          </p>
        </div>

        {/* Booking Date */}
        <div className="text-xs text-gray-500 text-right pt-2 border-t border-gray-200">
          تاریخ رزرو: {formatDateTime(booking.createdAt)}
        </div>

        {/* Payment Status */}
        {booking.payment && (
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs">
            <span
              className={`font-medium ${
                booking.payment.status === 'COMPLETED' ? 'text-green-600' : 'text-amber-600'
              }`}
            >
              {booking.payment.status === 'COMPLETED' ? 'پرداخت شده' : 'در انتظار پرداخت'}
            </span>
            <span className="text-gray-600">وضعیت پرداخت:</span>
          </div>
        )}
      </div>

      {/* Actions */}
      {showActions && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-end gap-2">
            {onView && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(booking.id)}
                className="flex items-center gap-1.5"
              >
                <Eye className="w-4 h-4" />
                مشاهده جزئیات
              </Button>
            )}

            {onDownload && booking.status === 'CONFIRMED' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDownload(booking.id)}
                className="flex items-center gap-1.5 text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Download className="w-4 h-4" />
                دانلود بلیط
              </Button>
            )}

            {onCancel && canCancel && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCancel(booking.id)}
                className="flex items-center gap-1.5 text-red-600 border-red-200 hover:bg-red-50"
              >
                <XCircle className="w-4 h-4" />
                لغو رزرو
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
