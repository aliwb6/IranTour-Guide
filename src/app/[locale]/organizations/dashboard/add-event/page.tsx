import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function AddEventPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const session = await auth()

  if (!session || !session.user) {
    redirect(`/${params.locale}/auth/signin`)
  }

  const organization = await prisma.organization.findUnique({
    where: { userId: session.user.id }
  })

  if (!organization) {
    redirect(`/${params.locale}`)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">افزودن رویداد جدید</h1>
        <p className="text-gray-600">اطلاعات رویداد خود را وارد کنید</p>
      </div>

      {/* Event Form */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <form className="space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">اطلاعات پایه</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان رویداد <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                  placeholder="مثال: جشنواره فرهنگی نوروز"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  شهر <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                  placeholder="مثال: تهران"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نوع رویداد <span className="text-red-500">*</span>
                </label>
                <select
                  name="type"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="NATIONAL">ملی</option>
                  <option value="RELIGIOUS">مذهبی</option>
                  <option value="ECONOMIC">اقتصادی</option>
                  <option value="ARTISTIC">هنری</option>
                  <option value="SCIENTIFIC">علمی</option>
                  <option value="TOURISM">گردشگری</option>
                  <option value="SPORTS">ورزشی</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  سبک رویداد <span className="text-red-500">*</span>
                </label>
                <select
                  name="style"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="EXHIBITION">نمایشگاه</option>
                  <option value="FESTIVAL">جشنواره</option>
                  <option value="CONFERENCE">کنفرانس</option>
                  <option value="RELIGIOUS">مذهبی</option>
                  <option value="TOURISM">گردشگری</option>
                  <option value="SPORTS">ورزشی</option>
                  <option value="EDUCATIONAL">آموزشی</option>
                  <option value="OTHER">سایر</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  محل برگزاری <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="venue"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                  placeholder="مثال: تالار وحدت"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ثابت یا متغیر <span className="text-red-500">*</span>
                </label>
                <select
                  name="fixedOrVariable"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                >
                  <option value="FIXED">ثابت</option>
                  <option value="VARIABLE">متغیر</option>
                </select>
              </div>
            </div>
          </div>

          {/* Date Information */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">اطلاعات زمانی</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تاریخ شروع <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تاریخ پایان <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="endDate"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  بازه زمانی (متن فارسی)
                </label>
                <input
                  type="text"
                  name="dateRangeText"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                  placeholder="مثال: ۱۵ تا ۲۵ فروردین ۱۴۰۴"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">توضیحات</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  توضیحات کوتاه <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="shortDescription"
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                  placeholder="خلاصه‌ای از رویداد (حداکثر ۲۰۰ کاراکتر)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  توضیحات کامل <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  required
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                  placeholder="توضیحات کامل درباره رویداد"
                />
              </div>
            </div>
          </div>

          {/* Contact Information (Auto-filled from organization) */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">اطلاعات تماس</h2>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600">
                اطلاعات تماس به‌طور خودکار از پروفایل سازمان شما پر می‌شود
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نام برگزارکننده
                </label>
                <input
                  type="text"
                  name="organizerName"
                  defaultValue={organization.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ایمیل
                </label>
                <input
                  type="email"
                  name="organizerEmail"
                  defaultValue={organization.email || ''}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تلفن تماس
                </label>
                <input
                  type="tel"
                  name="organizerPhone"
                  defaultValue={organization.phone || ''}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  وب‌سایت
                </label>
                <input
                  type="url"
                  name="website"
                  defaultValue={organization.website || ''}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                  placeholder="https://"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="px-8 py-3 bg-[#A01C1C] text-white rounded-lg hover:bg-[#7a1515] transition-colors font-medium"
            >
              ارسال برای بررسی
            </button>
            <button
              type="button"
              className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              ذخیره پیش‌نویس
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-8 py-3 text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-blue-900 mb-2">نکات مهم</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>رویداد شما پس از ارسال، توسط تیم بررسی می‌شود</li>
          <li>تأیید رویداد معمولاً ۲۴ تا ۴۸ ساعت زمان می‌برد</li>
          <li>لطفاً اطلاعات دقیق و کامل وارد کنید</li>
          <li>می‌توانید رویداد را به عنوان پیش‌نویس ذخیره کنید</li>
        </ul>
      </div>
    </div>
  )
}
