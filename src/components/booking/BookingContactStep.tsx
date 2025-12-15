'use client';

import { UseFormReturn } from 'react-hook-form';
import { Mail, Phone, User, CreditCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CreateBookingSchema } from '@/lib/validators/booking';

interface BookingContactStepProps {
  form: UseFormReturn<CreateBookingSchema>;
}

export default function BookingContactStep({ form }: BookingContactStepProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 text-right">اطلاعات تماس</h3>
        <p className="text-sm text-gray-600 text-right">
          لطفاً اطلاعات تماس خود را با دقت وارد کنید
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-right flex items-center justify-end gap-2">
            <span className="text-red-500">*</span>
            نام
            <User className="w-4 h-4" />
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="نام خود را وارد کنید"
            {...register('firstName')}
            className={`text-right ${errors.firstName ? 'border-red-500' : ''}`}
            dir="rtl"
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 text-right">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-right flex items-center justify-end gap-2">
            <span className="text-red-500">*</span>
            نام خانوادگی
            <User className="w-4 h-4" />
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="نام خانوادگی خود را وارد کنید"
            {...register('lastName')}
            className={`text-right ${errors.lastName ? 'border-red-500' : ''}`}
            dir="rtl"
          />
          {errors.lastName && (
            <p className="text-sm text-red-500 text-right">{errors.lastName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-right flex items-center justify-end gap-2">
            <span className="text-red-500">*</span>
            ایمیل
            <Mail className="w-4 h-4" />
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            {...register('email')}
            className={`text-left ${errors.email ? 'border-red-500' : ''}`}
            dir="ltr"
          />
          {errors.email && (
            <p className="text-sm text-red-500 text-right">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-right flex items-center justify-end gap-2">
            <span className="text-red-500">*</span>
            شماره تماس
            <Phone className="w-4 h-4" />
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="09123456789"
            {...register('phone')}
            className={`text-left ${errors.phone ? 'border-red-500' : ''}`}
            dir="ltr"
          />
          {errors.phone && (
            <p className="text-sm text-red-500 text-right">{errors.phone.message}</p>
          )}
        </div>

        {/* National ID (Optional) */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="nationalId" className="text-right flex items-center justify-end gap-2">
            کد ملی (اختیاری)
            <CreditCard className="w-4 h-4" />
          </Label>
          <Input
            id="nationalId"
            type="text"
            placeholder="۱۲۳۴۵۶۷۸۹۰"
            {...register('nationalId')}
            className={`text-left ${errors.nationalId ? 'border-red-500' : ''}`}
            dir="ltr"
            maxLength={10}
          />
          {errors.nationalId && (
            <p className="text-sm text-red-500 text-right">{errors.nationalId.message}</p>
          )}
          <p className="text-xs text-gray-500 text-right">
            در صورت نیاز به صدور بلیط یا گواهی شرکت در رویداد
          </p>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">ℹ️</span>
            </div>
          </div>
          <div className="flex-1 text-right">
            <h4 className="text-sm font-semibold text-blue-900 mb-1">نکته مهم</h4>
            <p className="text-sm text-blue-700">
              اطلاعات تماس برای ارسال تیکت، یادآوری‌ها و اطلاعات مهم رویداد استفاده خواهد شد.
              لطفاً از صحت اطلاعات خود اطمینان حاصل کنید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
