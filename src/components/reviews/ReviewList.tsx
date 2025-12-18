'use client';

import { Star, ThumbsUp, CheckCircle } from 'lucide-react';
import { useReviews } from '@/hooks/useReviews';
import moment from 'moment-jalaali';

interface ReviewListProps {
  eventId: string;
}

export default function ReviewList({ eventId }: ReviewListProps) {
  const { reviews, stats, isLoading, error } = useReviews(eventId);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        خطا در بارگذاری نظرات
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        هنوز نظری ثبت نشده است
      </div>
    );
  }

  return (
    <div className="space-y-8" dir="rtl">
      {/* Stats Summary */}
      {stats && (
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center">
                <div className="text-6xl font-bold text-gray-900">
                  {stats.averageRating.toFixed(1)}
                </div>
                <Star className="w-12 h-12 fill-yellow-400 text-yellow-400 mr-2" />
              </div>
              <p className="text-gray-600 mt-2">
                {stats.totalReviews} نظر
                {stats.verifiedCount > 0 && ` (${stats.verifiedCount} تأیید شده)`}
              </p>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = stats.ratingDistribution[star as keyof typeof stats.ratingDistribution] || 0;
                const percentage =
                  stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;

                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {star} ⭐
                    </span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="space-y-6">
        {reviews.map((review: any) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900">
                    {review.user?.name || 'کاربر'}
                  </h4>
                  {review.isVerified && (
                    <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      تأیید شده
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {moment(review.createdAt).format('jYYYY/jMM/jDD')}
                </p>
              </div>

              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Title */}
            {review.title && (
              <h5 className="font-medium text-gray-900 mb-2">
                {review.title}
              </h5>
            )}

            {/* Comment */}
            <p className="text-gray-700 leading-relaxed mb-4">
              {review.comment}
            </p>

            {/* Images (if any) */}
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.images.map((image: string, idx: number) => (
                  <div
                    key={idx}
                    className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200"
                  >
                    <img
                      src={image}
                      alt={`Review image ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4 border-t">
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                <ThumbsUp className="w-4 h-4" />
                مفید بود ({review.helpfulCount || 0})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
