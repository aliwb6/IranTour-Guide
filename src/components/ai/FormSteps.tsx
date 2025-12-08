'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, User, Heart, MapPin, FileText } from 'lucide-react'

interface FormStepsProps {
  currentStep: number
  totalSteps: number
  onStepClick?: (step: number) => void
}

const stepIcons = [User, Heart, MapPin, FileText]
const stepLabels = ['اطلاعات شخصی', 'علایق', 'برنامه سفر', 'بررسی و ثبت']

export const FormSteps: React.FC<FormStepsProps> = ({ currentStep, totalSteps, onStepClick }) => {
  return (
    <div className="w-full mb-8">
      {/* Progress Bar */}
      <div className="relative">
        {/* Background Line */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200" />

        {/* Active Progress Line */}
        <motion.div
          className="absolute top-8 left-0 h-1 bg-gold"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1
            const isActive = stepNumber === currentStep
            const isCompleted = stepNumber < currentStep
            const canClick = stepNumber < currentStep && onStepClick
            const Icon = stepIcons[index]

            return (
              <div
                key={stepNumber}
                className="flex flex-col items-center"
                style={{ width: `${100 / totalSteps}%` }}
              >
                {/* Step Circle */}
                <motion.button
                  type="button"
                  onClick={() => canClick && onStepClick(stepNumber)}
                  disabled={!canClick}
                  whileHover={canClick ? { scale: 1.1 } : {}}
                  whileTap={canClick ? { scale: 0.95 } : {}}
                  className={`
                    relative w-16 h-16 rounded-full flex items-center justify-center
                    font-black text-lg transition-all duration-300 z-10
                    ${isCompleted
                      ? 'bg-green-600 text-white border-4 border-green-700 shadow-lg'
                      : isActive
                        ? 'bg-gold text-white border-4 border-yellow-600 shadow-xl scale-110'
                        : 'bg-white text-gray-400 border-4 border-gray-300'
                    }
                    ${canClick ? 'cursor-pointer' : 'cursor-not-allowed'}
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-8 h-8" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}

                  {/* Pulse Animation for Active Step */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gold"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.button>

                {/* Step Label */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mt-3 text-center"
                >
                  <div className={`
                    text-sm font-bold
                    ${isActive ? 'text-gold' : isCompleted ? 'text-green-600' : 'text-gray-500'}
                  `}>
                    {stepLabels[index]}
                  </div>
                  <div className={`
                    text-xs font-medium mt-1
                    ${isActive || isCompleted ? 'text-gray-700' : 'text-gray-400'}
                  `}>
                    {isCompleted ? '✓ تکمیل شده' : isActive ? 'در حال انجام' : 'منتظر'}
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile: Simple Progress Bar */}
      <div className="md:hidden mt-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-gray-700">
            قدم {currentStep} از {totalSteps}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {stepLabels[currentStep - 1]}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gold"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  )
}
