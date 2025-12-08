'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { FormSteps } from './FormSteps'
import { InterestsTags } from './InterestsTags'
import { formSchema, type FormData, CITIES, BUDGET_OPTIONS } from '@/lib/validators/aiSuggestion'
import moment from 'moment-jalaali'

export const TravelPlannerForm: React.FC = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState<Partial<FormData>>({
    fullName: '',
    email: '',
    age: undefined,
    bio: '',
    interests: [],
    startDate: '',
    endDate: '',
    cities: [],
    budget: undefined
  })

  const totalSteps = 4

  // Update form field
  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // Toggle interest
  const toggleInterest = (interest: string) => {
    const currentInterests = formData.interests || []
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest]

    updateField('interests', newInterests)
  }

  // Toggle city
  const toggleCity = (city: string) => {
    const currentCities = formData.cities || []
    const newCities = currentCities.includes(city)
      ? currentCities.filter(c => c !== city)
      : [...currentCities, city]

    updateField('cities', newCities)
  }

  // Validate current step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.fullName || formData.fullName.length < 2) {
        newErrors.fullName = 'نام باید حداقل ۲ حرف باشد'
      }
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'ایمیل نامعتبر است'
      }
      if (formData.age && (formData.age < 10 || formData.age > 100)) {
        newErrors.age = 'سن باید بین ۱۰ تا ۱۰۰ سال باشد'
      }
    }

    if (step === 2) {
      if (!formData.bio || formData.bio.length < 100) {
        newErrors.bio = 'بیوگرافی باید حداقل ۱۰۰ حرف باشد'
      }
      if (!formData.interests || formData.interests.length === 0) {
        newErrors.interests = 'حداقل یک علاقه انتخاب کنید'
      }
    }

    if (step === 3) {
      if (!formData.startDate) {
        newErrors.startDate = 'تاریخ شروع الزامی است'
      }
      if (!formData.endDate) {
        newErrors.endDate = 'تاریخ پایان الزامی است'
      }
      if (formData.startDate && formData.endDate) {
        const start = new Date(formData.startDate)
        const end = new Date(formData.endDate)
        if (end <= start) {
          newErrors.endDate = 'تاریخ پایان باید بعد از تاریخ شروع باشد'
        }
      }
      if (!formData.cities || formData.cities.length === 0) {
        newErrors.cities = 'حداقل یک شهر انتخاب کنید'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Navigate to next step
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  // Navigate to previous step
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  // Submit form
  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    try {
      setIsSubmitting(true)

      // Final validation
      const result = formSchema.safeParse(formData)
      if (!result.success) {
        const zodErrors: Record<string, string> = {}
        result.error.issues.forEach(err => {
          if (err.path[0]) {
            zodErrors[err.path[0].toString()] = err.message
          }
        })
        setErrors(zodErrors)
        setIsSubmitting(false)
        return
      }

      // Call API
      const response = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate suggestions')
      }

      // Navigate to results page
      router.push(`/ai-suggest/results?id=${data.id}`)
    } catch (error: any) {
      console.error('Submission error:', error)
      setErrors({ submit: error.message || 'خطایی رخ داد' })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Form Steps Progress */}
        <FormSteps
          currentStep={currentStep}
          totalSteps={totalSteps}
          onStepClick={(step) => {
            if (step < currentStep) {
              setCurrentStep(step)
            }
          }}
        />

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="kashi-card p-6 md:p-10"
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-black text-red-900 mb-6">
                  اطلاعات شخصی
                </h2>

                <div className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      نام و نام خانوادگی *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      } focus:border-gold outline-none text-lg font-medium`}
                      placeholder="مثال: علی احمدی"
                    />
                    {errors.fullName && (
                      <p className="mt-2 text-sm text-red-600 font-medium">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      ایمیل *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } focus:border-gold outline-none text-lg font-medium`}
                      placeholder="example@email.com"
                      dir="ltr"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600 font-medium">{errors.email}</p>
                    )}
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      سن (اختیاری)
                    </label>
                    <input
                      type="number"
                      value={formData.age || ''}
                      onChange={(e) => updateField('age', e.target.value ? parseInt(e.target.value) : undefined)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-gold outline-none text-lg font-medium"
                      placeholder="۲۵"
                      min="10"
                      max="100"
                    />
                    {errors.age && (
                      <p className="mt-2 text-sm text-red-600 font-medium">{errors.age}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Interests & Bio */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-black text-red-900 mb-6">
                  علایق و درباره شما
                </h2>

                <div className="space-y-6">
                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      درباره خودتان بگویید *
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => updateField('bio', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        errors.bio ? 'border-red-500' : 'border-gray-300'
                      } focus:border-gold outline-none text-lg font-medium resize-none`}
                      placeholder="مثال: من یک عاشق سینما و هنر هستم. دوست دارم در سفرهایم از جشنواره‌های فیلم و نمایشگاه‌های هنری بازدید کنم..."
                      rows={6}
                    />
                    <div className="flex justify-between mt-2">
                      <span className={`text-sm font-medium ${
                        (formData.bio?.length || 0) < 100 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {formData.bio?.length || 0} / 500 حرف
                      </span>
                      {(formData.bio?.length || 0) < 100 && (
                        <span className="text-sm text-red-600 font-medium">
                          حداقل ۱۰۰ حرف نیاز است
                        </span>
                      )}
                    </div>
                    {errors.bio && (
                      <p className="mt-2 text-sm text-red-600 font-medium">{errors.bio}</p>
                    )}
                  </div>

                  {/* Interests */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-4">
                      علایق خود را انتخاب کنید *
                    </label>
                    <InterestsTags
                      selectedInterests={formData.interests || []}
                      onToggle={toggleInterest}
                    />
                    {errors.interests && (
                      <p className="mt-2 text-sm text-red-600 font-medium">{errors.interests}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Travel Details */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-black text-red-900 mb-6">
                  جزئیات سفر
                </h2>

                <div className="space-y-6">
                  {/* Dates */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        تاریخ شروع *
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => updateField('startDate', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${
                          errors.startDate ? 'border-red-500' : 'border-gray-300'
                        } focus:border-gold outline-none text-lg font-medium`}
                      />
                      {errors.startDate && (
                        <p className="mt-2 text-sm text-red-600 font-medium">{errors.startDate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        تاریخ پایان *
                      </label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => updateField('endDate', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${
                          errors.endDate ? 'border-red-500' : 'border-gray-300'
                        } focus:border-gold outline-none text-lg font-medium`}
                      />
                      {errors.endDate && (
                        <p className="mt-2 text-sm text-red-600 font-medium">{errors.endDate}</p>
                      )}
                    </div>
                  </div>

                  {/* Cities */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-4">
                      شهرهای مقصد را انتخاب کنید * (حداکثر ۵)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {CITIES.map((city) => {
                        const isSelected = formData.cities?.includes(city)
                        const isMaxReached = (formData.cities?.length || 0) >= 5

                        return (
                          <motion.button
                            key={city}
                            type="button"
                            onClick={() => toggleCity(city)}
                            disabled={!isSelected && isMaxReached}
                            whileHover={!(!isSelected && isMaxReached) ? { scale: 1.05 } : {}}
                            whileTap={!(!isSelected && isMaxReached) ? { scale: 0.95 } : {}}
                            className={`
                              px-4 py-3 rounded-xl font-bold border-2 transition-all
                              ${isSelected
                                ? 'bg-gold text-white border-yellow-600'
                                : !isSelected && isMaxReached
                                  ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed opacity-50'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-gold'
                              }
                            `}
                          >
                            {isSelected && '✓ '}
                            {city}
                          </motion.button>
                        )
                      })}
                    </div>
                    <p className="mt-2 text-sm text-gray-600 font-medium">
                      انتخاب شده: {formData.cities?.length || 0} از ۵
                    </p>
                    {errors.cities && (
                      <p className="mt-2 text-sm text-red-600 font-medium">{errors.cities}</p>
                    )}
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-4">
                      بودجه سفر (اختیاری)
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {BUDGET_OPTIONS.map((option) => (
                        <motion.button
                          key={option.value}
                          type="button"
                          onClick={() => updateField('budget', option.value)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`
                            px-4 py-4 rounded-xl font-bold border-2 transition-all
                            ${formData.budget === option.value
                              ? 'bg-gold text-white border-yellow-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-gold'
                            }
                          `}
                        >
                          <div className="text-2xl mb-1">{option.icon}</div>
                          <div className="text-sm">{option.label}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-black text-red-900 mb-6">
                  بررسی و تایید نهایی
                </h2>

                <div className="space-y-6">
                  {/* Personal Info */}
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
                    <h3 className="text-xl font-black text-purple-900 mb-4 flex items-center justify-between">
                      اطلاعات شخصی
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-sm font-bold text-gold hover:underline"
                      >
                        ویرایش
                      </button>
                    </h3>
                    <div className="space-y-2 text-gray-700">
                      <p><span className="font-bold">نام:</span> {formData.fullName}</p>
                      <p><span className="font-bold">ایمیل:</span> {formData.email}</p>
                      {formData.age && <p><span className="font-bold">سن:</span> {formData.age}</p>}
                    </div>
                  </div>

                  {/* Interests & Bio */}
                  <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
                    <h3 className="text-xl font-black text-green-900 mb-4 flex items-center justify-between">
                      علایق
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-sm font-bold text-gold hover:underline"
                      >
                        ویرایش
                      </button>
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {formData.interests?.map(interest => (
                        <span key={interest} className="px-3 py-1 bg-green-200 text-green-900 rounded-full text-sm font-bold">
                          {interest}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm">{formData.bio}</p>
                  </div>

                  {/* Travel Details */}
                  <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
                    <h3 className="text-xl font-black text-orange-900 mb-4 flex items-center justify-between">
                      جزئیات سفر
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="text-sm font-bold text-gold hover:underline"
                      >
                        ویرایش
                      </button>
                    </h3>
                    <div className="space-y-2 text-gray-700">
                      <p><span className="font-bold">تاریخ:</span> {formData.startDate} تا {formData.endDate}</p>
                      <p><span className="font-bold">شهرها:</span> {formData.cities?.join('، ')}</p>
                      {formData.budget && (
                        <p><span className="font-bold">بودجه:</span> {BUDGET_OPTIONS.find(b => b.value === formData.budget)?.label}</p>
                      )}
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700 font-medium">
                      با <span className="text-gold font-bold">شرایط و ضوابط</span> استفاده از سیستم پیشنهاد هوشمند موافقم و از استفاده صحیح از هوش مصنوعی اطمینان دارم.
                    </label>
                  </div>

                  {/* Submit Error */}
                  {errors.submit && (
                    <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                      <p className="text-red-800 font-bold">{errors.submit}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-gray-200">
            <motion.button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              whileHover={currentStep > 1 ? { scale: 1.02 } : {}}
              whileTap={currentStep > 1 ? { scale: 0.98 } : {}}
              className={`
                px-6 py-3 rounded-xl font-bold flex items-center gap-2
                ${currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <ChevronRight className="w-5 h-5" />
              قبلی
            </motion.button>

            {currentStep < totalSteps ? (
              <motion.button
                type="button"
                onClick={nextStep}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="deep-persian-btn px-8 py-3 font-bold flex items-center gap-2"
              >
                بعدی
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
            ) : (
              <motion.button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className={`
                  px-8 py-3 rounded-xl font-bold flex items-center gap-2
                  ${isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'deep-persian-btn'
                  }
                `}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    در حال ارسال...
                  </>
                ) : (
                  <>
                    ✨ دریافت پیشنهادات
                  </>
                )}
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
