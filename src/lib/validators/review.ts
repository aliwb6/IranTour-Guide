import { z } from 'zod'

// Create Review Schema
export const createReviewSchema = z.object({
  eventId: z.string().min(1, 'شناسه ایونت الزامی است'),

  bookingId: z.string().optional(),

  rating: z
    .number()
    .int('امتیاز باید عدد صحیح باشد')
    .min(1, 'حداقل امتیاز ۱ ستاره است')
    .max(5, 'حداکثر امتیاز ۵ ستاره است'),

  title: z
    .string()
    .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
    .max(100, 'عنوان نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد')
    .optional()
    .or(z.literal('')),

  comment: z
    .string()
    .min(10, 'نظر باید حداقل ۱۰ کاراکتر باشد')
    .max(1000, 'نظر نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد'),

  pros: z
    .string()
    .max(500, 'نکات مثبت نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد')
    .optional()
    .or(z.literal('')),

  cons: z
    .string()
    .max(500, 'نکات منفی نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد')
    .optional()
    .or(z.literal('')),

  images: z
    .array(z.string().url('آدرس تصویر معتبر نیست'))
    .max(5, 'حداکثر ۵ تصویر مجاز است')
    .optional()
    .default([]),
})

export type CreateReviewSchema = z.infer<typeof createReviewSchema>

// Update Review Schema
export const updateReviewSchema = z.object({
  rating: z
    .number()
    .int('امتیاز باید عدد صحیح باشد')
    .min(1, 'حداقل امتیاز ۱ ستاره است')
    .max(5, 'حداکثر امتیاز ۵ ستاره است')
    .optional(),

  title: z
    .string()
    .min(3, 'عنوان باید حداقل ۳ کاراکتر باشد')
    .max(100, 'عنوان نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد')
    .optional(),

  comment: z
    .string()
    .min(10, 'نظر باید حداقل ۱۰ کاراکتر باشد')
    .max(1000, 'نظر نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد')
    .optional(),

  pros: z.string().max(500, 'نکات مثبت نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد').optional(),

  cons: z.string().max(500, 'نکات منفی نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد').optional(),

  images: z
    .array(z.string().url('آدرس تصویر معتبر نیست'))
    .max(5, 'حداکثر ۵ تصویر مجاز است')
    .optional(),
})

export type UpdateReviewSchema = z.infer<typeof updateReviewSchema>

// Review Response Schema (for organization response)
export const reviewResponseSchema = z.object({
  reviewId: z.string().min(1, 'شناسه نظر الزامی است'),

  response: z
    .string()
    .min(10, 'پاسخ باید حداقل ۱۰ کاراکتر باشد')
    .max(500, 'پاسخ نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد'),
})

export type ReviewResponseSchema = z.infer<typeof reviewResponseSchema>

// Review Filters Schema
export const reviewFiltersSchema = z.object({
  eventId: z.string().optional(),
  userId: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional(),
  isVerified: z.boolean().optional(),
  isApproved: z.boolean().optional(),
  isPinned: z.boolean().optional(),
  hasImages: z.boolean().optional(),
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).max(100).optional().default(10),
  sortBy: z.enum(['recent', 'rating', 'helpful']).optional().default('recent'),
})

export type ReviewFiltersSchema = z.infer<typeof reviewFiltersSchema>

// Review Action Schema (for helpful, report, etc.)
export const reviewActionSchema = z.object({
  reviewId: z.string().min(1, 'شناسه نظر الزامی است'),
  action: z.enum(['helpful', 'report', 'approve', 'reject', 'pin', 'unpin', 'verify']),
  reason: z.string().max(200, 'دلیل نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد').optional(),
})

export type ReviewActionSchema = z.infer<typeof reviewActionSchema>
