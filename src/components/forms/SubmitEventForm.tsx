'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CITIES } from '@/config/cities'

interface EventFormData {
  title: string
  type: string
  style: string
  city: string
  venue: string
  address: string
  startDate: string
  endDate: string
  registrationDeadline: string
  fixedOrVariable: string
  durationText: string
  shortDescription: string
  description: string
  opportunities: string
  challenges: string
  organizerName: string
  organizerEmail: string
  organizerPhone: string
  website: string
  registrationUrl: string
  termsAccepted: boolean
}

const STEPS = [
  { title: 'اطلاعات پایه', icon: '📝' },
  { title: 'زمان‌بندی', icon: '📅' },
  { title: 'محتوا', icon: '📄' },
  { title: 'تماس', icon: '📞' },
  { title: 'تأیید', icon: '✅' },
]

const EVENT_TYPES = [
  { value: 'NATIONAL', label: 'ملی' },
  { value: 'RELIGIOUS', label: 'مذهبی' },
  { value: 'ECONOMIC', label: 'اقتصادی' },
  { value: 'ARTISTIC', label: 'هنری' },
  { value: 'SCIENTIFIC', label: 'علمی' },
  { value: 'TOURISM', label: 'گردشگری' },
  { value: 'SPORTS', label: 'ورزشی' },
]

const EVENT_STYLES = [
  { value: 'EXHIBITION', label: 'نمایشگاه' },
  { value: 'FESTIVAL', label: 'جشنواره' },
  { value: 'CONFERENCE', label: 'کنفرانس' },
  { value: 'RELIGIOUS', label: 'مذهبی' },
  { value: 'TOURISM', label: 'گردشگری' },
  { value: 'SPORTS', label: 'ورزشی' },
  { value: 'EDUCATIONAL', label: 'آموزشی' },
  { value: 'OTHER', label: 'سایر' },
]

export function SubmitEventForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EventFormData>({
    defaultValues: {
      fixedOrVariable: 'FIXED',
    },
  })

  const shortDescriptionLength = watch('shortDescription')?.length || 0

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          slug: data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
          dateRangeText: `${data.startDate} تا ${data.endDate}`,
          country: 'Iran',
          status: 'PENDING',
        }),
      })
      if (res.ok) {
        setSubmitSuccess(true)
      }
    } catch (error) {
      console.error('Submit error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1))
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0))

  if (submitSuccess) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">رویداد با موفقیت ثبت شد!</h2>
        <p className="text-gray-600 mb-8">رویداد شما پس از بررسی توسط تیم ما منتشر خواهد شد.</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {STEPS.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold border-2 transition-colors',
                  index < currentStep
                    ? 'bg-green-500 border-green-500 text-white'
                    : index === currentStep
                      ? 'bg-amber-500 border-amber-500 text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                )}
              >
                {index < currentStep ? <Check className="w-5 h-5" /> : step.icon}
              </div>
              <span className="text-xs font-medium text-gray-600 mt-1 hidden sm:block">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-amber-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Basic Info */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">اطلاعات پایه رویداد</h3>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">عنوان رویداد *</label>
              <input
                {...register('title', { required: 'عنوان الزامی است' })}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                placeholder="عنوان رویداد را وارد کنید"
              />
              {errors.title && <span className="text-red-500 text-xs mt-1">{errors.title.message}</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">نوع رویداد *</label>
                <select
                  {...register('type', { required: true })}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                >
                  <option value="">انتخاب کنید</option>
                  {EVENT_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">سبک رویداد *</label>
                <select
                  {...register('style', { required: true })}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                >
                  <option value="">انتخاب کنید</option>
                  {EVENT_STYLES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">شهر *</label>
                <select
                  {...register('city', { required: true })}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                >
                  <option value="">انتخاب شهر</option>
                  {CITIES.map((c) => (
                    <option key={c.slug} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">محل برگزاری *</label>
                <input
                  {...register('venue', { required: true })}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="نام محل برگزاری"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">آدرس</label>
              <input
                {...register('address')}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                placeholder="آدرس کامل محل برگزاری"
              />
            </div>
          </div>
        )}

        {/* Step 2: Timing */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">زمان‌بندی رویداد</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">تاریخ شروع *</label>
                <input
                  type="date"
                  {...register('startDate', { required: true })}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">تاریخ پایان *</label>
                <input
                  type="date"
                  {...register('endDate', { required: true })}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">مهلت ثبت‌نام</label>
                <input
                  type="date"
                  {...register('registrationDeadline')}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">مدت زمان</label>
                <input
                  {...register('durationText')}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="مثلاً: ۳ روز"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">نوع زمانی</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" {...register('fixedOrVariable')} value="FIXED" className="accent-amber-500" />
                  <span className="font-medium">ثابت</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" {...register('fixedOrVariable')} value="VARIABLE" className="accent-amber-500" />
                  <span className="font-medium">متغیر</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Content */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">محتوای رویداد</h3>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                توضیح کوتاه * <span className="text-gray-400">({shortDescriptionLength}/200)</span>
              </label>
              <textarea
                {...register('shortDescription', { required: true, maxLength: 200 })}
                maxLength={200}
                rows={2}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none"
                placeholder="توضیح کوتاه درباره رویداد (حداکثر ۲۰۰ کاراکتر)"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">توضیحات کامل *</label>
              <textarea
                {...register('description', { required: true })}
                rows={6}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none"
                placeholder="توضیحات کامل رویداد..."
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">فرصت‌ها</label>
              <textarea
                {...register('opportunities')}
                rows={3}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none"
                placeholder="فرصت‌ها و مزایای شرکت در رویداد"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">چالش‌ها</label>
              <textarea
                {...register('challenges')}
                rows={3}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none"
                placeholder="چالش‌ها و محدودیت‌های احتمالی"
              />
            </div>
          </div>
        )}

        {/* Step 4: Contact */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">اطلاعات تماس</h3>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">نام برگزارکننده *</label>
              <input
                {...register('organizerName', { required: true })}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                placeholder="نام شخص یا سازمان برگزارکننده"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">ایمیل *</label>
                <input
                  type="email"
                  {...register('organizerEmail', { required: true })}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">تلفن *</label>
                <input
                  type="tel"
                  {...register('organizerPhone', { required: true })}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="021-12345678"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">وب‌سایت</label>
                <input
                  type="url"
                  {...register('website')}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="https://example.com"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">لینک ثبت‌نام</label>
                <input
                  type="url"
                  {...register('registrationUrl')}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  placeholder="https://example.com/register"
                  dir="ltr"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Confirm */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">تأیید و ارسال</h3>

            <div className="bg-amber-50 rounded-xl p-6 space-y-3">
              <h4 className="font-bold text-gray-900">خلاصه اطلاعات</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="font-medium text-gray-500">عنوان:</span> {watch('title')}</div>
                <div><span className="font-medium text-gray-500">شهر:</span> {watch('city')}</div>
                <div><span className="font-medium text-gray-500">محل:</span> {watch('venue')}</div>
                <div><span className="font-medium text-gray-500">تاریخ:</span> {watch('startDate')} - {watch('endDate')}</div>
                <div><span className="font-medium text-gray-500">برگزارکننده:</span> {watch('organizerName')}</div>
                <div><span className="font-medium text-gray-500">ایمیل:</span> {watch('organizerEmail')}</div>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register('termsAccepted', { required: true })}
                className="mt-1 accent-amber-500"
              />
              <span className="text-sm text-gray-700">
                صحت اطلاعات وارد شده را تأیید می‌کنم و با{' '}
                <span className="text-amber-600 font-bold">قوانین و مقررات</span>{' '}
                سایت موافقم.
              </span>
            </label>
            {errors.termsAccepted && (
              <span className="text-red-500 text-xs">تأیید قوانین الزامی است</span>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
            مرحله قبل
          </button>

          {currentStep < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold hover:shadow-md transition-shadow"
            >
              مرحله بعد
              <ChevronLeft className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold hover:shadow-md transition-shadow disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              ارسال رویداد
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
