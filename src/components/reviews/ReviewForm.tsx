'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star, Loader2, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateReview } from '@/hooks/useReviews';

const reviewSchema = z.object({
  rating: z.number().min(1, 'لطفاً امتیاز را انتخاب کنید').max(5),
  title: z.string().min(5, 'عنوان باید حداقل ۵ کاراکتر باشد').max(100).optional(),
  comment: z.string().min(10, 'نظر باید حداقل ۱۰ کاراکتر باشد').max(1000),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  eventId: string;
  onSuccess?: () => void;
}

export default function ReviewForm({ eventId, onSuccess }: ReviewFormProps) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const { createReview, isLoading } = useCreateReview();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      title: '',
      comment: '',
    },
  });

  const rating = watch('rating');

  const onSubmit = async (data: ReviewFormData) => {
    try {
      await createReview({
        eventId,
        ...data,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Review submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" dir="rtl">
      {/* Rating */}
      <div>
        <Label className="text-base font-medium text-gray-900">امتیاز شما *</Label>
        <div className="flex items-center gap-4 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setValue('rating', star, { shouldValidate: true })}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= (hoveredRating || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="text-sm font-medium text-gray-700">
              {rating === 5 && 'عالی'}
              {rating === 4 && 'خوب'}
              {rating === 3 && 'متوسط'}
              {rating === 2 && 'ضعیف'}
              {rating === 1 && 'خیلی ضعیف'}
            </span>
          )}
        </div>
        {errors.rating && (
          <p className="text-sm text-red-600 mt-1">{errors.rating.message}</p>
        )}
      </div>

      {/* Title (Optional) */}
      <div>
        <Label htmlFor="title" className="text-base font-medium text-gray-900">
          عنوان نظر (اختیاری)
        </Label>
        <Input
          id="title"
          {...register('title')}
          placeholder="عنوان کوتاه برای نظر شما"
          className="mt-2"
          dir="rtl"
        />
        {errors.title && (
          <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Comment */}
      <div>
        <Label htmlFor="comment" className="text-base font-medium text-gray-900">
          نظر شما *
        </Label>
        <Textarea
          id="comment"
          {...register('comment')}
          placeholder="تجربه خود را با ما به اشتراک بگذارید..."
          className="mt-2 min-h-[150px] resize-none"
          dir="rtl"
        />
        {errors.comment && (
          <p className="text-sm text-red-600 mt-1">{errors.comment.message}</p>
        )}
        <p className="text-sm text-gray-500 mt-1 text-left">
          {watch('comment')?.length || 0}/1000 کاراکتر
        </p>
      </div>

      {/* Submit */}
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            در حال ارسال...
          </>
        ) : (
          'ثبت نظر'
        )}
      </Button>
    </form>
  );
}
