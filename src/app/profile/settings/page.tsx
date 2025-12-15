'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User, Lock, Bell, Globe, Shield, AlertTriangle, Save } from 'lucide-react'

// Validation schemas
const profileSchema = z.object({
  name: z.string().min(2, 'نام باید حداقل ۲ حرف باشد').max(50),
  bio: z.string().max(500, 'بیوگرافی نباید بیشتر از ۵۰۰ حرف باشد').optional(),
})

const passwordSchema = z
  .object({
    currentPassword: z.string().min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد'),
    newPassword: z.string().min(8, 'رمز عبور جدید باید حداقل ۸ کاراکتر باشد'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'رمزهای عبور یکسان نیستند',
    path: ['confirmPassword'],
  })

type ProfileFormData = z.infer<typeof profileSchema>
type PasswordFormData = z.infer<typeof passwordSchema>

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [notifications, setNotifications] = useState({
    email: true,
    newEvents: true,
    newsletter: false,
  })

  // Profile Form
  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: 'کاربر نمونه',
      bio: '',
    },
  })

  // Password Form
  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  })

  const onProfileSubmit = (data: ProfileFormData) => {
    console.log('Profile data:', data)
    alert('پروفایل با موفقیت به‌روزرسانی شد!')
  }

  const onPasswordSubmit = (data: PasswordFormData) => {
    console.log('Password data:', data)
    alert('رمز عبور با موفقیت تغییر کرد!')
    passwordForm.reset()
  }

  const tabs = [
    { id: 'profile', label: 'اطلاعات پروفایل', icon: User },
    { id: 'password', label: 'تغییر رمز عبور', icon: Lock },
    { id: 'notifications', label: 'اعلان‌ها', icon: Bell },
    { id: 'privacy', label: 'حریم خصوصی', icon: Shield },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="kashi-card p-6">
        <h1 className="text-3xl font-black text-red-900">تنظیمات</h1>
        <p className="text-gray-600 font-medium mt-2">مدیریت حساب کاربری و تنظیمات خود</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all
                ${
                  activeTab === tab.id
                    ? 'deep-persian-btn'
                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gold'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </motion.button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="kashi-card p-8">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                نام و نام خانوادگی *
              </label>
              <input
                {...profileForm.register('name')}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gold outline-none font-medium"
              />
              {profileForm.formState.errors.name && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {profileForm.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">ایمیل</label>
              <input
                type="email"
                value="user@example.com"
                disabled
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-gray-100 font-medium cursor-not-allowed"
              />
              <p className="mt-2 text-xs text-gray-500 font-medium">ایمیل قابل تغییر نیست</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                بیوگرافی (اختیاری)
              </label>
              <textarea
                {...profileForm.register('bio')}
                rows={4}
                placeholder="درباره خودتان بنویسید..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gold outline-none font-medium resize-none"
              />
              <p className="mt-2 text-xs text-gray-500 font-medium">حداکثر ۵۰۰ کاراکتر</p>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="deep-persian-btn px-8 py-3 font-bold flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              ذخیره تغییرات
            </motion.button>
          </form>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">رمز عبور فعلی *</label>
              <input
                type="password"
                {...passwordForm.register('currentPassword')}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gold outline-none font-medium"
              />
              {passwordForm.formState.errors.currentPassword && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {passwordForm.formState.errors.currentPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">رمز عبور جدید *</label>
              <input
                type="password"
                {...passwordForm.register('newPassword')}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gold outline-none font-medium"
              />
              {passwordForm.formState.errors.newPassword && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {passwordForm.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                تکرار رمز عبور جدید *
              </label>
              <input
                type="password"
                {...passwordForm.register('confirmPassword')}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gold outline-none font-medium"
              />
              {passwordForm.formState.errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {passwordForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="deep-persian-btn px-8 py-3 font-bold flex items-center gap-2"
            >
              <Lock className="w-5 h-5" />
              تغییر رمز عبور
            </motion.button>
          </form>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h3 className="font-black text-gray-900 mb-1">اعلان‌های ایمیل</h3>
                <p className="text-sm text-gray-600 font-medium">دریافت اعلان‌ها از طریق ایمیل</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-300 rounded-full peer peer-checked:bg-gold transition-colors" />
                <div className="absolute w-5 h-5 bg-white rounded-full left-1 top-1 peer-checked:translate-x-7 transition-transform" />
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h3 className="font-black text-gray-900 mb-1">رویدادهای جدید</h3>
                <p className="text-sm text-gray-600 font-medium">
                  اطلاع از رویدادهای جدید در شهرها و موضوعات دنبال‌شده
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.newEvents}
                  onChange={(e) =>
                    setNotifications({ ...notifications, newEvents: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-300 rounded-full peer peer-checked:bg-gold transition-colors" />
                <div className="absolute w-5 h-5 bg-white rounded-full left-1 top-1 peer-checked:translate-x-7 transition-transform" />
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h3 className="font-black text-gray-900 mb-1">خبرنامه</h3>
                <p className="text-sm text-gray-600 font-medium">دریافت خبرنامه هفتگی</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.newsletter}
                  onChange={(e) =>
                    setNotifications({ ...notifications, newsletter: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-300 rounded-full peer peer-checked:bg-gold transition-colors" />
                <div className="absolute w-5 h-5 bg-white rounded-full left-1 top-1 peer-checked:translate-x-7 transition-transform" />
              </label>
            </div>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <div className="space-y-8">
            <div className="p-6 bg-red-50 border-2 border-red-200 rounded-xl">
              <div className="flex items-start gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xl font-black text-red-900 mb-2">منطقه خطرناک</h3>
                  <p className="text-red-800 font-medium">
                    حذف حساب کاربری غیرقابل بازگشت است و تمام داده‌های شما پاک خواهد شد.
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (
                    confirm(
                      'آیا مطمئن هستید که می‌خواهید حساب خود را حذف کنید؟ این عمل غیرقابل بازگشت است!'
                    )
                  ) {
                    alert('حساب کاربری حذف شد')
                  }
                }}
                className="px-6 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <AlertTriangle className="w-5 h-5" />
                حذف حساب کاربری
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
