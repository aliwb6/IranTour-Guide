'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Search, Calendar, MapPin, CheckCircle } from 'lucide-react'

const loadingSteps = [
  { icon: Search, text: 'در حال تحلیل علایق شما...', duration: 2000 },
  { icon: Calendar, text: 'جستجو در رویدادها...', duration: 2500 },
  { icon: MapPin, text: 'ایجاد برنامه سفر...', duration: 2000 },
  { icon: CheckCircle, text: 'تقریباً آماده است...', duration: 1500 },
]

export const SuggestionLoading: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Cycle through loading steps
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % loadingSteps.length)
    }, 2500)

    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95 // Stop at 95% to avoid completing before data arrives
        return prev + 1
      })
    }, 100)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
    }
  }, [])

  const currentStep = loadingSteps[currentStepIndex]
  const Icon = currentStep.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="kashi-card p-8 text-center"
        >
          {/* Animated Icon */}
          <motion.div
            key={currentStepIndex}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="flex justify-center mb-6"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center relative">
              <Icon className="w-12 h-12 text-purple-900" />

              {/* Pulse Animation */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gold"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Loading Text */}
          <motion.h3
            key={`text-${currentStepIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-black text-red-900 mb-6"
          >
            {currentStep.text}
          </motion.h3>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-gray-700">پیشرفت</span>
              <span className="text-sm font-bold text-gold">{progress}٪</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold to-yellow-400"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Sparkles */}
          <div className="flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                <Sparkles className="w-5 h-5 text-gold" />
              </motion.div>
            ))}
          </div>

          {/* Description */}
          <p className="mt-6 text-sm text-gray-600 font-medium">
            لطفاً صبر کنید، هوش مصنوعی در حال آماده‌سازی بهترین پیشنهادات برای شما است
          </p>
        </motion.div>
      </div>
    </div>
  )
}
