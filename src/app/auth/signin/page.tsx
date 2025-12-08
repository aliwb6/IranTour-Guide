'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, LogIn, ArrowRight, AlertCircle } from 'lucide-react'
import { signIn } from 'next-auth/react'

const signinSchema = z.object({
  email: z.string().email('لطفا یک ایمیل معتبر وارد کنید'),
  password: z.string().min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد')
})

type SigninFormData = z.infer<typeof signinSchema>

function SigninContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema)
  })

  // Check for registration success message
  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccess('ثبت‌نام شما با موفقیت انجام شد! حالا می‌توانید وارد شوید')
    }
  }, [searchParams])

  const onSubmit = async (data: SigninFormData) => {
    try {
      setError(null)

      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setError('ایمیل یا رمز عبور اشتباه است')
        return
      }

      // Redirect to home page
      router.push('/')
      router.refresh()
    } catch (err) {
      console.error('Signin error:', err)
      setError('خطایی در ورود رخ داد. لطفاً دوباره تلاش کنید')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-red-900 hover:text-red-700 transition mb-6">
            <ArrowRight className="w-5 h-5" />
            <span className="font-bold">بازگشت به صفحه اصلی</span>
          </Link>

          <h1 className="text-4xl font-black text-red-900 mb-2">
            ورود به حساب کاربری
          </h1>
          <p className="text-gray-600 font-medium">
            به IranTour Guide خوش آمدید
          </p>
        </div>

        {/* Form Card */}
        <div className="kashi-card p-8">
          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-center gap-3"
            >
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white font-black">
                ✓
              </div>
              <p className="text-green-800 font-bold">{success}</p>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-3"
            >
              <AlertCircle className="w-6 h-6 text-red-600" />
              <p className="text-red-800 font-bold">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                ایمیل *
              </label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="example@email.com"
                  className="w-full pr-12 pl-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gold outline-none font-medium transition-colors"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                رمز عبور *
              </label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  {...register('password')}
                  placeholder="••••••••"
                  className="w-full pr-12 pl-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gold outline-none font-medium transition-colors"
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-left">
              <Link
                href="/auth/forgot-password"
                className="text-sm font-bold text-purple-600 hover:text-purple-700 transition"
              >
                رمز عبور خود را فراموش کرده‌اید؟
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full deep-persian-btn px-8 py-4 font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogIn className="w-5 h-5" />
              {isSubmitting ? 'در حال ورود...' : 'ورود'}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-bold">یا</span>
            </div>
          </div>

          {/* Signup Link */}
          <div className="text-center">
            <p className="text-gray-600 font-medium mb-4">
              حساب کاربری ندارید؟
            </p>
            <Link href="/auth/signup">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:border-gold hover:text-gold transition-colors"
              >
                ثبت‌نام کنید
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Info Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl"
        >
          <p className="text-sm text-blue-800 font-medium text-center">
            🔒 اطلاعات شما با رمزنگاری امن محافظت می‌شود
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function SigninPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">در حال بارگذاری...</p>
        </div>
      </div>
    }>
      <SigninContent />
    </React.Suspense>
  )
}
