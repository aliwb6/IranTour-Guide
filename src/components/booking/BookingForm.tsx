'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

// ✅ Zod Schema با type safety کامل
const createBookingSchema = z.object({
  eventId: z.string().min(1, 'شناسه رویداد الزامی است'),
  eventTitle: z.string().min(1, 'عنوان رویداد الزامی است'),
  eventDate: z.union([z.string(), z.date()]),
  numberOfTickets: z.number().int().min(1, 'حداقل ۱ بلیط').max(10, 'حداکثر ۱۰ بلیط'),
  firstName: z.string().min(2, 'نام باید حداقل ۲ حرف باشد').max(50, 'نام بیش از حد طولانی است'),
  lastName: z.string().min(2, 'نام خانوادگی باید حداقل ۲ حرف باشد').max(50, 'نام خانوادگی بیش از حد طولانی است'),
  email: z.string().email('لطفاً یک ایمیل معتبر وارد کنید'),
  phoneNumber: z.string()
    .length(11, 'شماره تلفن باید ۱۱ رقم باشد')
    .regex(/^09[0-9]{9}$/, 'شماره تلفن باید با ۰۹ شروع شود'),
  nationalCode: z.string().length(10, 'کد ملی باید ۱۰ رقم باشد').optional().or(z.literal('')),
  specialRequests: z.string().max(500, 'درخواست ویژه بیش از حد طولانی است').optional().or(z.literal('')),
})

// ✅ Type inference از Zod
type CreateBookingSchema = z.infer<typeof createBookingSchema>

// ✅ Props interface
interface BookingFormProps {
  eventId: string
  eventTitle: string
  eventDate: string | Date
  basePrice?: number
  availableSpots?: number | null
}

export function BookingForm({
  eventId,
  eventTitle,
  eventDate,
  basePrice = 0,
  availableSpots = null,
}: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ✅ useForm با defaultValues کامل و صحیح
  const form = useForm<CreateBookingSchema>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      eventId: eventId || '',
      eventTitle: eventTitle || '',
      eventDate: eventDate || new Date(),
      numberOfTickets: 1, // 👈 مقدار پیش‌فرض عددی
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      nationalCode: '',
      specialRequests: '',
    },
    mode: 'onChange',
  })

  // Watch tickets for price calculation
  const watchedTickets = form.watch('numberOfTickets') || 1
  const totalPrice = basePrice * watchedTickets

  // ✅ Submit handler
  const onSubmit = async (data: CreateBookingSchema) => {
    setIsSubmitting(true)
    try {
      console.log('📝 Booking Data:', data)

      // TODO: Replace with actual API call
      // const response = await fetch('/api/bookings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      alert(`✅ رزرو با موفقیت ثبت شد!\n\nمجموع: ${totalPrice.toLocaleString('fa-IR')} تومان`)

      // Reset form
      form.reset()
    } catch (error) {
      console.error('❌ Booking Error:', error)
      alert('خطا در ثبت رزرو. لطفاً دوباره تلاش کنید.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto space-y-6 p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="space-y-2 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-900 text-right">
          فرم رزرو رویداد
        </h2>
        <p className="text-gray-600 text-right">{eventTitle}</p>
        <div className="text-sm text-gray-500 text-right">
        {availableSpots !== null && (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800">
            ظرفیت باقیمانده: {availableSpots} نفر
          </span>
        )}
        </div>
      </div>

      {/* Hidden Fields */}
      <input type="hidden" {...form.register('eventId')} />
      <input type="hidden" {...form.register('eventTitle')} />
      <input type="hidden" {...form.register('eventDate')} />

      {/* Number of Tickets */}
      <div className="space-y-2">
        <Label htmlFor="numberOfTickets" className="text-right block">
          تعداد بلیط *
        </Label>
        <Input
          id="numberOfTickets"
          type="number"
          min={1}
          max={10}
          {...form.register('numberOfTickets', { valueAsNumber: true })}
          className="text-right"
        />
        {form.formState.errors.numberOfTickets && (
          <p className="text-sm text-red-600 text-right">
            {form.formState.errors.numberOfTickets.message}
          </p>
        )}

        {/* Price Display */}
        <div className="bg-gray-50 p-3 rounded-md space-y-1">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{basePrice.toLocaleString('fa-IR')} تومان</span>
            <span className="text-gray-600">قیمت هر بلیط:</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-primary">
            <span>{totalPrice.toLocaleString('fa-IR')} تومان</span>
            <span>مجموع:</span>
          </div>
        </div>
      </div>

      {/* First Name */}
      <div className="space-y-2">
        <Label htmlFor="firstName" className="text-right block">نام *</Label>
        <Input
          id="firstName"
          {...form.register('firstName')}
          className="text-right"
          placeholder="نام خود را وارد کنید"
        />
        {form.formState.errors.firstName && (
          <p className="text-sm text-red-600 text-right">
            {form.formState.errors.firstName.message}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div className="space-y-2">
        <Label htmlFor="lastName" className="text-right block">نام خانوادگی *</Label>
        <Input
          id="lastName"
          {...form.register('lastName')}
          className="text-right"
          placeholder="نام خانوادگی خود را وارد کنید"
        />
        {form.formState.errors.lastName && (
          <p className="text-sm text-red-600 text-right">
            {form.formState.errors.lastName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-right block">ایمیل *</Label>
        <Input
          id="email"
          type="email"
          {...form.register('email')}
          className="text-left"
          placeholder="example@email.com"
          dir="ltr"
        />
        {form.formState.errors.email && (
          <p className="text-sm text-red-600 text-right">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <Label htmlFor="phoneNumber" className="text-right block">شماره تلفن *</Label>
        <Input
          id="phoneNumber"
          type="tel"
          {...form.register('phoneNumber')}
          className="text-left"
          placeholder="09123456789"
          dir="ltr"
        />
        {form.formState.errors.phoneNumber && (
          <p className="text-sm text-red-600 text-right">
            {form.formState.errors.phoneNumber.message}
          </p>
        )}
      </div>

      {/* National Code (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="nationalCode" className="text-right block">کد ملی (اختیاری)</Label>
        <Input
          id="nationalCode"
          {...form.register('nationalCode')}
          className="text-left"
          placeholder="1234567890"
          dir="ltr"
        />
        {form.formState.errors.nationalCode && (
          <p className="text-sm text-red-600 text-right">
            {form.formState.errors.nationalCode.message}
          </p>
        )}
      </div>

      {/* Special Requests (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="specialRequests" className="text-right block">درخواست‌های ویژه (اختیاری)</Label>
        <Textarea
          id="specialRequests"
          {...form.register('specialRequests')}
          className="text-right min-h-[100px]"
          placeholder="اگر درخواست یا نیاز خاصی دارید، در اینجا بنویسید..."
        />
        {form.formState.errors.specialRequests && (
          <p className="text-sm text-red-600 text-right">
            {form.formState.errors.specialRequests.message}
          </p>
        )}
      </div>

      {/* Terms */}
      <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
        <p className="text-sm text-gray-700 text-right mb-2">با ثبت رزرو، شما موارد زیر را می‌پذیرید:</p>
        <ul className="text-sm text-gray-600 space-y-1 text-right list-disc list-inside">
          <li>قوانین و مقررات رویداد</li>
          <li>سیاست کنسلی و بازگشت وجه</li>
          <li>اطلاعات وارد شده صحیح و معتبر است</li>
        </ul>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full text-lg py-6 bg-green-600 hover:bg-green-700"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⏳</span>
            در حال ثبت...
          </span>
        ) : (
          `تایید و پرداخت ${totalPrice.toLocaleString('fa-IR')} تومان`
        )}
      </Button>

      {/* Debug Info (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md text-xs">
          <p className="font-bold mb-2">🔍 Debug Info</p>
          <div className="space-y-1">
            <p>Valid: {form.formState.isValid ? '✅ Yes' : '❌ No'}</p>
            <p>Dirty: {form.formState.isDirty ? 'Yes' : 'No'}</p>
            <p>Errors: {Object.keys(form.formState.errors).length}</p>
            {Object.keys(form.formState.errors).length > 0 && (
              <pre className="mt-2 p-2 bg-white rounded text-xs overflow-auto">
                {JSON.stringify(form.formState.errors, null, 2)}
              </pre>
            )}
          </div>
        </div>
      )}
    </form>
  )
}
