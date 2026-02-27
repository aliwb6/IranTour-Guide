'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, AlertCircle } from 'lucide-react'

const cities = [
  'تهران', 'اصفهان', 'شیراز', 'مشهد', 'یزد', 'تبریز',
  'کرمان', 'اهواز', 'قم', 'کاشان', 'رشت', 'همدان',
  'کرمانشاه', 'ارومیه', 'زنجان', 'سنندج', 'بندرعباس', 'کیش',
]

const eventTypes = ['ملی', 'مذهبی', 'هنری', 'علمی', 'گردشگری', 'فرهنگی', 'ورزشی']
const eventStyles = ['نمایشگاه', 'جشنواره', 'کنفرانس', 'مراسم', 'ورزشی', 'آموزشی', 'سایر']

export default function SubmitEventPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitSuccess(true)
    } catch {
      setSubmitError('خطا در ثبت رویداد. لطفاً دوباره تلاش کنید.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="kashi-card p-12 max-w-md w-full text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-red-900 mb-2">ثبت موفق!</h2>
          <p className="text-gray-700 font-bold mb-6">
            رویداد شما با موفقیت ثبت شد و پس از بررسی منتشر خواهد شد.
          </p>
          <Link href="/events" className="deep-persian-btn px-8 py-3 font-black inline-block">
            مشاهده رویدادها ←
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="kashi-star-pattern py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-yellow-100 mb-6 drop-shadow-lg">
            ➕ افزودن رویداد جدید
          </h1>
          <p className="text-xl text-yellow-50 font-bold drop-shadow">
            رویداد فرهنگی، هنری یا گردشگری خود را با ما به اشتراک بگذارید
          </p>
        </div>
      </section>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="kashi-card p-8 md:p-12">
          {/* Info Banner */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl px-6 py-4 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-black text-blue-900 mb-1">نکات مهم</h3>
                <ul className="text-sm text-blue-800 space-y-1 font-medium">
                  <li>• رویدادها پس از بررسی تیم منتشر می‌شوند</li>
                  <li>• اطلاعات را با دقت و کامل وارد کنید</li>
                </ul>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div>
              <label className="block text-gray-700 font-black mb-2">عنوان رویداد *</label>
              <input
                type="text"
                required
                minLength={5}
                className="w-full px-4 py-3 rounded-xl border-2 border-gold focus:border-red-900 focus:outline-none font-bold"
                placeholder="مثال: جشنواره فرهنگی نوروز"
              />
            </div>

            {/* City & Venue */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-black mb-2">📍 شهر *</label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gold focus:border-red-900 focus:outline-none font-bold bg-white"
                >
                  <option value="">انتخاب شهر</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-black mb-2">🏛️ محل برگزاری *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gold focus:border-red-900 focus:outline-none font-bold"
                  placeholder="مثال: تالار وحدت"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-black mb-2">📅 تاریخ شروع *</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gold focus:border-red-900 focus:outline-none font-bold"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-black mb-2">📅 تاریخ پایان *</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gold focus:border-red-900 focus:outline-none font-bold"
                />
              </div>
            </div>

            {/* Type & Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-black mb-2">🎭 نوع رویداد *</label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gold focus:border-red-900 focus:outline-none font-bold bg-white"
                >
                  <option value="">انتخاب نوع</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-black mb-2">🏷️ سبک رویداد *</label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gold focus:border-red-900 focus:outline-none font-bold bg-white"
                >
                  <option value="">انتخاب سبک</option>
                  {eventStyles.map((style) => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Descriptions */}
            <div>
              <label className="block text-gray-700 font-black mb-2">توضیحات کوتاه *</label>
              <textarea
                required
                rows={2}
                minLength={20}
                maxLength={200}
                className="w-full px-4 py-3 rounded-xl border-2 border-gold focus:border-red-900 focus:outline-none font-bold resize-none"
                placeholder="خلاصه‌ای کوتاه از رویداد (حداکثر ۲۰۰ کاراکتر)"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-black mb-2">توضیحات کامل *</label>
              <textarea
                required
                rows={6}
                minLength={50}
                className="w-full px-4 py-3 rounded-xl border-2 border-gold focus:border-red-900 focus:outline-none font-bold resize-none"
                placeholder="توضیحات کامل درباره رویداد، برنامه‌ها و جزئیات"
              />
            </div>

            {/* Organizer Info */}
            <div className="border-t-2 border-gold pt-8">
              <h3 className="text-xl font-black text-red-900 mb-6">📞 اطلاعات تماس برگزارکننده</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-black mb-2">نام برگزارکننده *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gold focus:border-red-900 focus:outline-none font-bold"
                    placeholder="نام شخص یا سازمان"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-black mb-2">ایمیل *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gold focus:border-red-900 focus:outline-none font-bold"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-black mb-2">شماره تماس *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gold focus:border-red-900 focus:outline-none font-bold"
                    placeholder="09123456789"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-black mb-2">وب‌سایت (اختیاری)</label>
                  <input
                    type="url"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gold focus:border-red-900 focus:outline-none font-bold"
                    placeholder="https://example.com"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            {/* Submit Error */}
            {submitError && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <p className="text-red-800 font-bold">{submitError}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`deep-persian-btn flex-1 px-8 py-4 font-black text-center ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'در حال ثبت...' : '✅ ثبت رویداد'}
              </button>
              <Link
                href="/events"
                className="flex-1 px-8 py-4 rounded-xl border-2 border-red-900 text-red-900 font-black hover:bg-red-900 hover:text-yellow-200 transition text-center"
              >
                انصراف
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
