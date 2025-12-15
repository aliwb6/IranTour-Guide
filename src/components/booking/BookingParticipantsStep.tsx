'use client'

import { UseFormReturn } from 'react-hook-form'
import { Users, Baby, Plus, Minus, MessageSquare } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import type { CreateBookingSchema } from '@/lib/validators/booking'

interface BookingParticipantsStepProps {
  form: UseFormReturn<CreateBookingSchema, any, any>
}

export default function BookingParticipantsStep({ form }: BookingParticipantsStepProps) {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = form

  const numberOfAdults = watch('numberOfAdults')
  const numberOfChildren = watch('numberOfChildren') || 0

  const incrementAdults = () => {
    if (numberOfAdults < 50) {
      setValue('numberOfAdults', numberOfAdults + 1, { shouldValidate: true })
    }
  }

  const decrementAdults = () => {
    if (numberOfAdults > 1) {
      setValue('numberOfAdults', numberOfAdults - 1, { shouldValidate: true })
    }
  }

  const incrementChildren = () => {
    if (numberOfChildren < 50) {
      setValue('numberOfChildren', numberOfChildren + 1, { shouldValidate: true })
    }
  }

  const decrementChildren = () => {
    if (numberOfChildren > 0) {
      setValue('numberOfChildren', numberOfChildren - 1, { shouldValidate: true })
    }
  }

  const totalParticipants = numberOfAdults + numberOfChildren

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 text-right">تعداد شرکت‌کنندگان</h3>
        <p className="text-sm text-gray-600 text-right">
          تعداد افراد شرکت‌کننده در این رویداد را مشخص کنید
        </p>
      </div>

      {/* Participants Counter */}
      <div className="space-y-4">
        {/* Adults */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={decrementAdults}
              disabled={numberOfAdults <= 1}
              className="h-10 w-10 rounded-full"
            >
              <Minus className="w-4 h-4" />
            </Button>

            <div className="w-16 text-center">
              <span className="text-2xl font-bold text-gray-900">{numberOfAdults}</span>
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={incrementAdults}
              disabled={numberOfAdults >= 50}
              className="h-10 w-10 rounded-full"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-1">
              <span className="font-semibold text-gray-900">بزرگسال</span>
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <p className="text-sm text-gray-500">بالای ۱۲ سال</p>
          </div>
        </div>

        {errors.numberOfAdults && (
          <p className="text-sm text-red-500 text-right">{errors.numberOfAdults.message}</p>
        )}

        {/* Children */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={decrementChildren}
              disabled={numberOfChildren <= 0}
              className="h-10 w-10 rounded-full"
            >
              <Minus className="w-4 h-4" />
            </Button>

            <div className="w-16 text-center">
              <span className="text-2xl font-bold text-gray-900">{numberOfChildren}</span>
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={incrementChildren}
              disabled={numberOfChildren >= 50}
              className="h-10 w-10 rounded-full"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-1">
              <span className="font-semibold text-gray-900">کودک</span>
              <Baby className="w-5 h-5 text-gray-600" />
            </div>
            <p className="text-sm text-gray-500">زیر ۱۲ سال</p>
          </div>
        </div>

        {errors.numberOfChildren && (
          <p className="text-sm text-red-500 text-right">{errors.numberOfChildren.message}</p>
        )}

        {/* Total */}
        <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
          <div className="text-2xl font-bold text-primary">
            {totalParticipants} {totalParticipants === 1 ? 'نفر' : 'نفر'}
          </div>
          <div className="text-right">
            <span className="font-semibold text-gray-900">جمع کل شرکت‌کنندگان</span>
          </div>
        </div>
      </div>

      {/* Special Requests */}
      <div className="space-y-2">
        <Label htmlFor="specialRequests" className="text-right flex items-center justify-end gap-2">
          درخواست‌های ویژه (اختیاری)
          <MessageSquare className="w-4 h-4" />
        </Label>
        <Textarea
          id="specialRequests"
          placeholder="هر درخواست یا نیاز خاصی که دارید را در اینجا بنویسید (مثلاً: نیاز به صندلی چرخدار، رژیم غذایی خاص و...)"
          {...register('specialRequests')}
          className={`text-right min-h-[100px] resize-none ${
            errors.specialRequests ? 'border-red-500' : ''
          }`}
          dir="rtl"
          maxLength={500}
        />
        {errors.specialRequests && (
          <p className="text-sm text-red-500 text-right">{errors.specialRequests.message}</p>
        )}
        <p className="text-xs text-gray-500 text-right">
          {watch('specialRequests')?.length || 0}/500 کاراکتر
        </p>
      </div>

      {/* Info Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">💡</span>
            </div>
          </div>
          <div className="flex-1 text-right">
            <h4 className="text-sm font-semibold text-amber-900 mb-1">توجه</h4>
            <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
              <li>قیمت کودکان معمولاً ۵۰٪ قیمت بزرگسال است</li>
              <li>ظرفیت محدود است، در صورت تمام شدن ظرفیت امکان رزرو وجود ندارد</li>
              <li>برای گروه‌های بالای ۱۰ نفر با پشتیبانی تماس بگیرید</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
