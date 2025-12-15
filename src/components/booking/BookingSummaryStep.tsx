'use client';

import { UseFormReturn } from 'react-hook-form';
import {
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  Users,
  Baby,
  CreditCard,
  Tag,
  FileText,
} from 'lucide-react';
import type { CreateBookingSchema } from '@/lib/validators/booking';
import moment from 'moment-jalaali';

interface BookingSummaryStepProps {
  form: UseFormReturn<CreateBookingSchema>;
  eventTitle: string;
  eventDate: Date;
  totals: {
    adultsTotal: number;
    childrenTotal: number;
    subtotal: number;
    discountAmount: number;
    total: number;
    totalParticipants: number;
  };
}

export default function BookingSummaryStep({
  form,
  eventTitle,
  eventDate,
  totals,
}: BookingSummaryStepProps) {
  const { watch } = form;
  const formData = watch();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const formatDate = (date: Date) => {
    return moment(date).format('jYYYY/jMM/jDD');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 text-right">بررسی و تایید نهایی</h3>
        <p className="text-sm text-gray-600 text-right">
          لطفاً اطلاعات رزرو خود را بررسی کنید
        </p>
      </div>

      {/* Event Information */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 border border-primary/20">
        <h4 className="text-lg font-bold text-gray-900 mb-4 text-right flex items-center justify-end gap-2">
          اطلاعات رویداد
          <Calendar className="w-5 h-5 text-primary" />
        </h4>
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <span className="font-semibold text-gray-900">{eventTitle}</span>
            <span className="text-sm text-gray-600">عنوان رویداد:</span>
          </div>
          <div className="flex items-start justify-between">
            <span className="font-semibold text-gray-900">{formatDate(eventDate)}</span>
            <span className="text-sm text-gray-600">تاریخ:</span>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h4 className="text-lg font-bold text-gray-900 mb-4 text-right flex items-center justify-end gap-2">
          اطلاعات تماس
          <User className="w-5 h-5 text-gray-600" />
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-900">
              {formData.firstName} {formData.lastName}
            </span>
            <span className="text-sm text-gray-600 flex items-center gap-2">
              <User className="w-4 h-4" />
              نام و نام خانوادگی:
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-900 text-left" dir="ltr">
              {formData.email}
            </span>
            <span className="text-sm text-gray-600 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              ایمیل:
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-900 text-left" dir="ltr">
              {formData.phone}
            </span>
            <span className="text-sm text-gray-600 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              تلفن:
            </span>
          </div>
          {formData.nationalId && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-900 text-left" dir="ltr">
                {formData.nationalId}
              </span>
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                کد ملی:
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Participants */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h4 className="text-lg font-bold text-gray-900 mb-4 text-right flex items-center justify-end gap-2">
          شرکت‌کنندگان
          <Users className="w-5 h-5 text-gray-600" />
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-2xl font-bold text-blue-600">{formData.numberOfAdults}</span>
            <span className="text-sm text-gray-600 flex items-center gap-2">
              <Users className="w-4 h-4" />
              بزرگسال
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <span className="text-2xl font-bold text-green-600">
              {formData.numberOfChildren || 0}
            </span>
            <span className="text-sm text-gray-600 flex items-center gap-2">
              <Baby className="w-4 h-4" />
              کودک
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
            <span className="text-2xl font-bold text-purple-600">
              {totals.totalParticipants}
            </span>
            <span className="text-sm text-gray-600">جمع کل</span>
          </div>
        </div>
      </div>

      {/* Special Requests */}
      {formData.specialRequests && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h4 className="text-lg font-bold text-gray-900 mb-4 text-right flex items-center justify-end gap-2">
            درخواست‌های ویژه
            <FileText className="w-5 h-5 text-gray-600" />
          </h4>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 text-right leading-relaxed">{formData.specialRequests}</p>
          </div>
        </div>
      )}

      {/* Pricing Details */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border-2 border-gray-200">
        <h4 className="text-lg font-bold text-gray-900 mb-4 text-right flex items-center justify-end gap-2">
          جزئیات قیمت
          <Tag className="w-5 h-5 text-gray-600" />
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-gray-300">
            <span className="text-gray-900">
              {formatPrice(totals.adultsTotal)} تومان
            </span>
            <span className="text-sm text-gray-600">
              بزرگسال ({formData.numberOfAdults} نفر × {formatPrice(formData.pricePerPerson)}{' '}
              تومان)
            </span>
          </div>

          {formData.numberOfChildren > 0 && (
            <div className="flex items-center justify-between pb-3 border-b border-gray-300">
              <span className="text-gray-900">
                {formatPrice(totals.childrenTotal)} تومان
              </span>
              <span className="text-sm text-gray-600">
                کودک ({formData.numberOfChildren} نفر ×{' '}
                {formatPrice(formData.childrenPrice || 0)} تومان)
              </span>
            </div>
          )}

          <div className="flex items-center justify-between pb-3 border-b border-gray-300">
            <span className="text-gray-900">
              {formatPrice(totals.subtotal)} تومان
            </span>
            <span className="text-sm font-medium text-gray-700">جمع جزء:</span>
          </div>

          {formData.discount > 0 && (
            <div className="flex items-center justify-between pb-3 border-b border-gray-300">
              <span className="text-red-600">
                -{formatPrice(totals.discountAmount)} تومان
              </span>
              <span className="text-sm text-gray-600">
                تخفیف ({formData.discount}%)
              </span>
            </div>
          )}

          <div className="flex items-center justify-between pt-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg p-4 mt-4">
            <span className="text-2xl font-bold">
              {formatPrice(totals.total)} تومان
            </span>
            <span className="text-lg font-bold">مبلغ قابل پرداخت:</span>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            required
          />
          <label htmlFor="terms" className="text-sm text-gray-700 text-right flex-1">
            با{' '}
            <a href="/terms" className="text-primary underline" target="_blank">
              قوانین و مقررات
            </a>{' '}
            و{' '}
            <a href="/privacy" className="text-primary underline" target="_blank">
              سیاست حفظ حریم خصوصی
            </a>{' '}
            موافقم و اطلاعات فوق را تایید می‌کنم.
          </label>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">⚠️</span>
            </div>
          </div>
          <div className="flex-1 text-right">
            <h4 className="text-sm font-semibold text-red-900 mb-1">توجه</h4>
            <p className="text-sm text-red-700">
              پس از تایید و ثبت رزرو، به صفحه پرداخت منتقل خواهید شد. در صورت عدم پرداخت در
              مدت ۳۰ دقیقه، رزرو شما لغو خواهد شد.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
