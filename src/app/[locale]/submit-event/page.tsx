'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Upload,
  Link as LinkIcon,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const submitEventSchema = z.object({
  title: z.string().min(5, 'عنوان باید حداقل ۵ کاراکتر باشد').max(200),
  city: z.string().min(1, 'انتخاب شهر الزامی است'),
  venue: z.string().min(3, 'محل برگزاری الزامی است'),
  startDate: z.string().min(1, 'تاریخ شروع الزامی است'),
  endDate: z.string().min(1, 'تاریخ پایان الزامی است'),
  type: z.string().min(1, 'انتخاب نوع رویداد الزامی است'),
  style: z.string().min(1, 'انتخاب سبک رویداد الزامی است'),
  shortDescription: z
    .string()
    .min(20, 'توضیحات کوتاه باید حداقل ۲۰ کاراکتر باشد')
    .max(200),
  description: z.string().min(50, 'توضیحات کامل باید حداقل ۵۰ کاراکتر باشد'),
  organizerName: z.string().min(2, 'نام برگزارکننده الزامی است'),
  organizerEmail: z.string().email('ایمیل معتبر وارد کنید'),
  organizerPhone: z
    .string()
    .regex(/^09[0-9]{9}$/, 'شماره تلفن معتبر وارد کنید (مثال: 09123456789)'),
  website: z.string().url('آدرس وب‌سایت معتبر وارد کنید').optional().or(z.literal('')),
});

type SubmitEventFormData = z.infer<typeof submitEventSchema>;

const cities = [
  'تهران',
  'اصفهان',
  'شیراز',
  'مشهد',
  'یزد',
  'تبریز',
  'کرمان',
  'اهواز',
  'قم',
  'کاشان',
  'رشت',
  'همدان',
];

const eventTypes = [
  { value: 'NATIONAL', label: 'ملی' },
  { value: 'RELIGIOUS', label: 'مذهبی' },
  { value: 'ECONOMIC', label: 'اقتصادی' },
  { value: 'ARTISTIC', label: 'هنری' },
  { value: 'SCIENTIFIC', label: 'علمی' },
  { value: 'TOURISM', label: 'گردشگری' },
  { value: 'SPORTS', label: 'ورزشی' },
];

const eventStyles = [
  { value: 'EXHIBITION', label: 'نمایشگاه' },
  { value: 'FESTIVAL', label: 'جشنواره' },
  { value: 'CONFERENCE', label: 'کنفرانس' },
  { value: 'RELIGIOUS', label: 'مذهبی' },
  { value: 'TOURISM', label: 'گردشگری' },
  { value: 'SPORTS', label: 'ورزشی' },
  { value: 'EDUCATIONAL', label: 'آموزشی' },
  { value: 'OTHER', label: 'سایر' },
];

export default function SubmitEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SubmitEventFormData>({
    resolver: zodResolver(submitEventSchema),
  });

  const onSubmit = async (data: SubmitEventFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('خطا در ثبت رویداد');
      }

      setSubmitSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/events');
      }, 2000);
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitError(
        error instanceof Error ? error.message : 'خطا در ثبت رویداد. لطفاً دوباره تلاش کنید.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">ثبت موفق!</h2>
          <p className="text-gray-600 mb-4">
            رویداد شما با موفقیت ثبت شد و پس از بررسی منتشر خواهد شد.
          </p>
          <p className="text-sm text-gray-500">
            در حال انتقال به صفحه رویدادها...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-l from-[#A01C1C] to-[#7a1515] text-white px-8 py-10">
            <h1 className="text-3xl font-bold mb-2">
              افزودن رویداد جدید
            </h1>
            <p className="text-white/90">
              رویداد فرهنگی، هنری یا گردشگری خود را با ما به اشتراک بگذارید
            </p>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border-r-4 border-blue-500 px-8 py-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">نکات مهم</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• رویدادهای ثبت شده پس از بررسی تیم منتشر می‌شوند</li>
                  <li>• لطفاً اطلاعات را با دقت و کامل وارد کنید</li>
                  <li>• تصاویر و لینک‌های مرتبط را در توضیحات قرار دهید</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-8 space-y-8">
            <div className="space-y-6">
              {/* Event Title */}
              <div>
                <Label htmlFor="title" className="text-base font-semibold">
                  عنوان رویداد *
                </Label>
                <Input
                  id="title"
                  {...register('title')}
                  className="mt-2"
                  placeholder="مثال: جشنواره فرهنگی نوروز"
                />
                {errors.title && (
                  <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="city" className="text-base font-semibold">
                    شهر *
                  </Label>
                  <Select onValueChange={(value) => setValue('city', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="انتخاب شهر" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.city && (
                    <p className="text-sm text-red-600 mt-1">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="venue" className="text-base font-semibold">
                    محل برگزاری *
                  </Label>
                  <Input
                    id="venue"
                    {...register('venue')}
                    className="mt-2"
                    placeholder="مثال: تالار وحدت"
                  />
                  {errors.venue && (
                    <p className="text-sm text-red-600 mt-1">{errors.venue.message}</p>
                  )}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="startDate" className="text-base font-semibold">
                    تاریخ شروع *
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    {...register('startDate')}
                    className="mt-2"
                  />
                  {errors.startDate && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.startDate.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="endDate" className="text-base font-semibold">
                    تاریخ پایان *
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    {...register('endDate')}
                    className="mt-2"
                  />
                  {errors.endDate && (
                    <p className="text-sm text-red-600 mt-1">{errors.endDate.message}</p>
                  )}
                </div>
              </div>

              {/* Type & Style */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="type" className="text-base font-semibold">
                    نوع رویداد *
                  </Label>
                  <Select onValueChange={(value) => setValue('type', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="انتخاب نوع" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <p className="text-sm text-red-600 mt-1">{errors.type.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="style" className="text-base font-semibold">
                    سبک رویداد *
                  </Label>
                  <Select onValueChange={(value) => setValue('style', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="انتخاب سبک" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventStyles.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.style && (
                    <p className="text-sm text-red-600 mt-1">{errors.style.message}</p>
                  )}
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <Label htmlFor="shortDescription" className="text-base font-semibold">
                  توضیحات کوتاه *
                </Label>
                <Textarea
                  id="shortDescription"
                  {...register('shortDescription')}
                  className="mt-2 resize-none"
                  rows={2}
                  placeholder="خلاصه‌ای کوتاه از رویداد (حداکثر ۲۰۰ کاراکتر)"
                />
                {errors.shortDescription && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.shortDescription.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="description" className="text-base font-semibold">
                  توضیحات کامل *
                </Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  className="mt-2 resize-none"
                  rows={6}
                  placeholder="توضیحات کامل درباره رویداد، برنامه‌ها و جزئیات"
                />
                {errors.description && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Organizer Info */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  اطلاعات تماس برگزارکننده
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="organizerName" className="text-base">
                      نام برگزارکننده *
                    </Label>
                    <Input
                      id="organizerName"
                      {...register('organizerName')}
                      className="mt-2"
                      placeholder="نام شخص یا سازمان"
                    />
                    {errors.organizerName && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.organizerName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="organizerEmail" className="text-base">
                      ایمیل *
                    </Label>
                    <Input
                      id="organizerEmail"
                      type="email"
                      {...register('organizerEmail')}
                      className="mt-2"
                      placeholder="example@email.com"
                    />
                    {errors.organizerEmail && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.organizerEmail.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="organizerPhone" className="text-base">
                      شماره تماس *
                    </Label>
                    <Input
                      id="organizerPhone"
                      {...register('organizerPhone')}
                      className="mt-2"
                      placeholder="09123456789"
                      dir="ltr"
                    />
                    {errors.organizerPhone && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.organizerPhone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="website" className="text-base">
                      وب‌سایت (اختیاری)
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      {...register('website')}
                      className="mt-2"
                      placeholder="https://example.com"
                      dir="ltr"
                    />
                    {errors.website && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.website.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Error */}
            {submitError && (
              <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded">
                <p className="text-red-800">{submitError}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                انصراف
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#A01C1C] hover:bg-[#7a1515] text-white px-8"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    در حال ثبت...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 ml-2" />
                    ثبت رویداد
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
