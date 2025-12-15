import { z } from 'zod'

// Phone number regex for Iranian phone numbers
const iranianPhoneRegex = /^(\+98|0)?9\d{9}$/

// National ID regex for Iranian national ID
const iranianNationalIdRegex = /^\d{10}$/

// Email regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Create Booking Schema
export const createBookingSchema = z.object({
  eventId: z.string().min(1, 'شناسه ایونت الزامی است'),
  eventTitle: z.string().min(1, 'عنوان ایونت الزامی است'),
  eventDate: z.union([z.string(), z.date()]),

  // Contact Information
  firstName: z
    .string()
    .min(2, 'نام باید حداقل ۲ کاراکتر باشد')
    .max(50, 'نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد')
    .regex(/^[\u0600-\u06FFa-zA-Z\s]+$/, 'نام باید فقط شامل حروف فارسی یا انگلیسی باشد'),

  lastName: z
    .string()
    .min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد')
    .max(50, 'نام خانوادگی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد')
    .regex(/^[\u0600-\u06FFa-zA-Z\s]+$/, 'نام خانوادگی باید فقط شامل حروف فارسی یا انگلیسی باشد'),

  email: z
    .string()
    .min(1, 'ایمیل الزامی است')
    .regex(emailRegex, 'فرمت ایمیل صحیح نیست')
    .email('فرمت ایمیل صحیح نیست'),

  phone: z
    .string()
    .min(1, 'شماره تلفن الزامی است')
    .regex(iranianPhoneRegex, 'شماره تلفن معتبر نیست (مثال: 09123456789)'),

  nationalId: z
    .string()
    .regex(iranianNationalIdRegex, 'کد ملی باید ۱۰ رقم باشد')
    .optional()
    .or(z.literal('')),

  // Booking Details
  numberOfAdults: z
    .number()
    .int('تعداد باید عدد صحیح باشد')
    .min(1, 'حداقل یک نفر بزرگسال الزامی است')
    .max(50, 'حداکثر ۵۰ نفر بزرگسال مجاز است'),

  numberOfChildren: z
    .number()
    .int('تعداد باید عدد صحیح باشد')
    .min(0, 'تعداد کودکان نمی‌تواند منفی باشد')
    .max(50, 'حداکثر ۵۰ کودک مجاز است'),

  specialRequests: z
    .string()
    .max(500, 'درخواست‌های ویژه نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد')
    .optional()
    .or(z.literal('')),

  // Pricing
  pricePerPerson: z.number().min(0, 'قیمت نمی‌تواند منفی باشد'),

  childrenPrice: z.number().min(0, 'قیمت کودکان نمی‌تواند منفی باشد'),

  discount: z
    .number()
    .min(0, 'تخفیف نمی‌تواند منفی باشد')
    .max(100, 'تخفیف نمی‌تواند بیشتر از ۱۰۰٪ باشد'),
})

export type CreateBookingSchema = z.infer<typeof createBookingSchema>

// Update Booking Schema
export const updateBookingSchema = z.object({
  numberOfAdults: z
    .number()
    .int('تعداد باید عدد صحیح باشد')
    .min(1, 'حداقل یک نفر بزرگسال الزامی است')
    .max(50, 'حداکثر ۵۰ نفر بزرگسال مجاز است')
    .optional(),

  numberOfChildren: z
    .number()
    .int('تعداد باید عدد صحیح باشد')
    .min(0, 'تعداد کودکان نمی‌تواند منفی باشد')
    .max(50, 'حداکثر ۵۰ کودک مجاز است')
    .optional(),

  specialRequests: z
    .string()
    .max(500, 'درخواست‌های ویژه نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد')
    .optional(),

  notes: z.string().max(1000, 'یادداشت‌ها نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد').optional(),

  phone: z
    .string()
    .regex(iranianPhoneRegex, 'شماره تلفن معتبر نیست (مثال: 09123456789)')
    .optional(),

  email: z
    .string()
    .regex(emailRegex, 'فرمت ایمیل صحیح نیست')
    .email('فرمت ایمیل صحیح نیست')
    .optional(),
})

export type UpdateBookingSchema = z.infer<typeof updateBookingSchema>

// Cancel Booking Schema
export const cancelBookingSchema = z.object({
  cancellationReason: z
    .string()
    .min(10, 'لطفاً دلیل لغو را با حداقل ۱۰ کاراکتر توضیح دهید')
    .max(500, 'دلیل لغو نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد'),
})

export type CancelBookingSchema = z.infer<typeof cancelBookingSchema>

// Booking Query/Filter Schema
export const bookingFiltersSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'EXPIRED']).optional(),
  eventId: z.string().optional(),
  userId: z.string().optional(),
  startDate: z.union([z.string(), z.date()]).optional(),
  endDate: z.union([z.string(), z.date()]).optional(),
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).max(100).optional().default(10),
})

export type BookingFiltersSchema = z.infer<typeof bookingFiltersSchema>

// Booking Form Step 1: Contact Information
export const bookingContactSchema = z.object({
  firstName: z
    .string()
    .min(2, 'نام باید حداقل ۲ کاراکتر باشد')
    .max(50, 'نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد')
    .regex(/^[\u0600-\u06FFa-zA-Z\s]+$/, 'نام باید فقط شامل حروف فارسی یا انگلیسی باشد'),

  lastName: z
    .string()
    .min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد')
    .max(50, 'نام خانوادگی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد')
    .regex(/^[\u0600-\u06FFa-zA-Z\s]+$/, 'نام خانوادگی باید فقط شامل حروف فارسی یا انگلیسی باشد'),

  email: z
    .string()
    .min(1, 'ایمیل الزامی است')
    .regex(emailRegex, 'فرمت ایمیل صحیح نیست')
    .email('فرمت ایمیل صحیح نیست'),

  phone: z
    .string()
    .min(1, 'شماره تلفن الزامی است')
    .regex(iranianPhoneRegex, 'شماره تلفن معتبر نیست (مثال: 09123456789)'),

  nationalId: z
    .string()
    .regex(iranianNationalIdRegex, 'کد ملی باید ۱۰ رقم باشد')
    .optional()
    .or(z.literal('')),
})

export type BookingContactSchema = z.infer<typeof bookingContactSchema>

// Booking Form Step 2: Participants
export const bookingParticipantsSchema = z.object({
  numberOfAdults: z
    .number()
    .int('تعداد باید عدد صحیح باشد')
    .min(1, 'حداقل یک نفر بزرگسال الزامی است')
    .max(50, 'حداکثر ۵۰ نفر بزرگسال مجاز است'),

  numberOfChildren: z
    .number()
    .int('تعداد باید عدد صحیح باشد')
    .min(0, 'تعداد کودکان نمی‌تواند منفی باشد')
    .max(50, 'حداکثر ۵۰ کودک مجاز است')
    .optional()
    .default(0),

  specialRequests: z
    .string()
    .max(500, 'درخواست‌های ویژه نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد')
    .optional()
    .or(z.literal('')),
})

export type BookingParticipantsSchema = z.infer<typeof bookingParticipantsSchema>
