'use client';

import { useState } from 'react';
import { Search, Filter, ChevronDown, Loader2, FileX } from 'lucide-react';
import type { Booking, BookingStatus } from '@/types/booking';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BookingCard from './BookingCard';
import BookingStatusBadge from './BookingStatusBadge';

interface BookingListProps {
  bookings: Booking[];
  loading?: boolean;
  onView?: (bookingId: string) => void;
  onCancel?: (bookingId: string) => void;
  onDownload?: (bookingId: string) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  showFilter?: boolean;
}

export default function BookingList({
  bookings,
  loading = false,
  onView,
  onCancel,
  onDownload,
  onLoadMore,
  hasMore = false,
  showFilter = true,
}: BookingListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | 'ALL'>('ALL');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${booking.firstName} ${booking.lastName}`.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'ALL' || booking.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // Group bookings by status for stats
  const statusCounts = bookings.reduce((acc, booking) => {
    acc[booking.status] = (acc[booking.status] || 0) + 1;
    return acc;
  }, {} as Record<BookingStatus, number>);

  const statuses: Array<BookingStatus | 'ALL'> = [
    'ALL',
    'PENDING',
    'CONFIRMED',
    'COMPLETED',
    'CANCELLED',
    'EXPIRED',
  ];

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      {showFilter && (
        <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="جستجو بر اساس کد رزرو، عنوان رویداد یا نام..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 text-right"
              dir="rtl"
            />
          </div>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center justify-between"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isFilterOpen ? 'rotate-180' : ''
              }`}
            />
            <span className="flex items-center gap-2">
              فیلتر بر اساس وضعیت
              <Filter className="w-4 h-4" />
            </span>
          </Button>

          {/* Filter Options */}
          {isFilterOpen && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
              {statuses.map((status) => {
                const count = status === 'ALL'
                  ? bookings.length
                  : statusCounts[status as BookingStatus] || 0;

                return (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`
                      p-3 rounded-lg border-2 transition-all text-center
                      ${
                        selectedStatus === status
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    {status === 'ALL' ? (
                      <div>
                        <div className="text-lg font-bold text-gray-900">{count}</div>
                        <div className="text-xs text-gray-600 mt-1">همه</div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-lg font-bold text-gray-900">{count}</div>
                        <div className="mt-1">
                          <BookingStatusBadge status={status as BookingStatus} size="sm" showIcon={false} />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              در حال بارگذاری...
            </span>
          ) : (
            <span>نمایش {filteredBookings.length} رزرو</span>
          )}
        </div>
        {selectedStatus !== 'ALL' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedStatus('ALL')}
            className="text-primary"
          >
            حذف فیلتر
          </Button>
        )}
      </div>

      {/* Bookings Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : filteredBookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onView={onView}
              onCancel={onCancel}
              onDownload={onDownload}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="flex flex-col items-center gap-4">
            <FileX className="w-16 h-16 text-gray-300" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                رزروی یافت نشد
              </h3>
              <p className="text-sm text-gray-600">
                {searchQuery
                  ? 'نتیجه‌ای برای جستجوی شما یافت نشد'
                  : 'هنوز هیچ رزروی ثبت نکرده‌اید'}
              </p>
            </div>
            {searchQuery && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedStatus('ALL');
                }}
              >
                پاک کردن جستجو
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Load More */}
      {hasMore && !loading && (
        <div className="text-center pt-6">
          <Button
            variant="outline"
            onClick={onLoadMore}
            className="min-w-[200px]"
          >
            بارگذاری بیشتر
          </Button>
        </div>
      )}
    </div>
  );
}
