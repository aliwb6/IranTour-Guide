'use client'

import React, { useState } from 'react'
import {
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Instagram,
  Send as Telegram,
  Twitter,
  Facebook,
  Linkedin,
  CheckCircle,
  Calendar,
  Eye,
} from 'lucide-react'
import { organizationTypeLabels } from '@/lib/validators/organization'

// This would normally come from server props or API
const mockOrganization = {
  id: '1',
  name: 'مرکز فرهنگی هنری',
  type: 'CULTURAL_CENTER' as const,
  description: 'مرکز فرهنگی و هنری فعال در زمینه برگزاری رویدادهای فرهنگی',
  logo: null,
  website: 'https://example.com',
  email: 'info@example.com',
  phone: '۰۲۱۱۲۳۴۵۶۷۸',
  address: 'تهران، خیابان ولیعصر',
  instagram: '@example',
  telegram: '@example',
  twitter: '@example',
  facebook: 'example',
  linkedin: 'example',
  isVerified: true,
  createdAt: new Date('2024-01-01'),
  totalEvents: 23,
  totalViews: 8750,
}

export default function OrganizationProfilePage() {
  const [formData, setFormData] = useState(mockOrganization)
  const [saving, setSaving] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Placeholder for API call
      // await fetch(`/api/organizations/${formData.id}/profile`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert('اطلاعات با موفقیت ذخیره شد')
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('خطا در ذخیره اطلاعات')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">پروفایل سازمان</h1>
        <p className="text-gray-600">مدیریت اطلاعات سازمان خود</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-[#A01C1C]" />
                اطلاعات پایه
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نام سازمان <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع سازمان <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                  >
                    {Object.entries(organizationTypeLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">توضیحات</label>
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                    placeholder="توضیحات کوتاهی درباره سازمان خود"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Mail className="w-6 h-6 text-[#A01C1C]" />
                اطلاعات تماس
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      وب‌سایت
                    </div>
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      ایمیل
                    </div>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                    placeholder="info@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      تلفن تماس
                    </div>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                    placeholder="۰۲۱۱۲۳۴۵۶۷۸"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      آدرس
                    </div>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                    placeholder="تهران، خیابان..."
                  />
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">شبکه‌های اجتماعی</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Instagram className="w-4 h-4" />
                      اینستاگرام
                    </div>
                  </label>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                    placeholder="@username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Telegram className="w-4 h-4" />
                      تلگرام
                    </div>
                  </label>
                  <input
                    type="text"
                    name="telegram"
                    value={formData.telegram || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                    placeholder="@username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Twitter className="w-4 h-4" />
                      توییتر
                    </div>
                  </label>
                  <input
                    type="text"
                    name="twitter"
                    value={formData.twitter || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                    placeholder="@username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Facebook className="w-4 h-4" />
                      فیسبوک
                    </div>
                  </label>
                  <input
                    type="text"
                    name="facebook"
                    value={formData.facebook || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                    placeholder="username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      لینکدین
                    </div>
                  </label>
                  <input
                    type="text"
                    name="linkedin"
                    value={formData.linkedin || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A01C1C]"
                    placeholder="username"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <button
                type="submit"
                disabled={saving}
                className="w-full md:w-auto px-8 py-3 bg-[#A01C1C] text-white rounded-lg hover:bg-[#7a1515] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar - Statistics */}
        <div className="space-y-6">
          {/* Verification Status */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-900 mb-4">وضعیت تأیید</h3>
            {formData.isVerified ? (
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-900">تأیید شده</p>
                  <p className="text-sm text-green-700">سازمان شما تأیید شده است</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <CheckCircle className="w-8 h-8 text-yellow-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-yellow-900">در انتظار تأیید</p>
                  <p className="text-sm text-yellow-700">سازمان شما در حال بررسی است</p>
                </div>
              </div>
            )}
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-900 mb-4">آمار سازمان</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">کل رویدادها</span>
                </div>
                <span className="font-bold text-gray-900" dir="ltr">
                  {formData.totalEvents.toLocaleString('fa-IR')}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">کل بازدیدها</span>
                </div>
                <span className="font-bold text-gray-900" dir="ltr">
                  {formData.totalViews.toLocaleString('fa-IR')}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">عضویت از</span>
                </div>
                <span className="font-bold text-gray-900" dir="rtl">
                  {new Date(formData.createdAt).toLocaleDateString('fa-IR')}
                </span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-bold text-blue-900 mb-3">نکات مهم</h3>
            <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside">
              <li>اطلاعات دقیق وارد کنید</li>
              <li>لوگوی سازمان را آپلود کنید</li>
              <li>شبکه‌های اجتماعی را تکمیل کنید</li>
              <li>اطلاعات تماس را به‌روز نگه دارید</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
