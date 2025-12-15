'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, RefreshCw, ArrowRight, Calendar, MapPin, FileText } from 'lucide-react'

interface SuggestionErrorProps {
  error: string
  onRetry?: () => void
  onBack?: () => void
}

const suggestions = [
  {
    icon: Calendar,
    text: 'تاریخ سفر را بررسی کنید - آیا رویدادی در آن بازه وجود دارد؟',
  },
  {
    icon: MapPin,
    text: 'شهرهای بیشتری انتخاب کنید یا شهرهای دیگر را امتحان کنید',
  },
  {
    icon: FileText,
    text: 'بیوگرافی دقیق‌تری بنویسید و علایق خود را واضح‌تر بیان کنید',
  },
]

export const SuggestionError: React.FC<SuggestionErrorProps> = ({ error, onRetry, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="kashi-card p-8"
        >
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="flex justify-center mb-6"
          >
            <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
          </motion.div>

          {/* Error Title */}
          <h2 className="text-3xl font-black text-red-900 text-center mb-4">مشکلی پیش آمده!</h2>

          {/* Error Message */}
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-800 font-bold text-center">
              {error || 'خطایی در ایجاد پیشنهادات رخ داد'}
            </p>
          </div>

          {/* Suggestions */}
          <div className="mb-8">
            <h3 className="text-xl font-black text-gray-800 mb-4 text-center">
              پیشنهادات برای رفع مشکل:
            </h3>
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => {
                const Icon = suggestion.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-200"
                  >
                    <Icon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 font-medium text-sm">{suggestion.text}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {onRetry && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onRetry}
                className="flex-1 deep-persian-btn px-6 py-4 font-black text-lg flex items-center justify-center gap-3"
              >
                <RefreshCw className="w-5 h-5" />
                تلاش مجدد
              </motion.button>
            )}

            {onBack && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onBack}
                className="flex-1 px-6 py-4 font-black text-lg rounded-xl bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
              >
                <ArrowRight className="w-5 h-5" />
                بازگشت به فرم
              </motion.button>
            )}
          </div>

          {/* Help Text */}
          <p className="mt-6 text-center text-sm text-gray-500 font-medium">
            اگر مشکل همچنان ادامه داشت، لطفاً با پشتیبانی تماس بگیرید
          </p>
        </motion.div>
      </div>
    </div>
  )
}
