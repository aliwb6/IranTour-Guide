'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { INTERESTS } from '@/lib/validators/aiSuggestion'

interface InterestsTagsProps {
  selectedInterests: string[]
  onToggle: (interest: string) => void
  maxSelection?: number
}

export const InterestsTags: React.FC<InterestsTagsProps> = ({
  selectedInterests,
  onToggle,
  maxSelection = 6
}) => {
  const isSelected = (interest: string) => selectedInterests.includes(interest)
  const isMaxReached = selectedInterests.length >= maxSelection

  return (
    <div>
      {/* Counter */}
      <div className="mb-4 text-center">
        <span className={`text-lg font-bold ${
          selectedInterests.length === 0
            ? 'text-gray-500'
            : selectedInterests.length >= maxSelection
              ? 'text-red-600'
              : 'text-green-600'
        }`}>
          انتخاب شده: {selectedInterests.length} از {maxSelection}
        </span>
      </div>

      {/* Tags Grid */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
          }
        }}
        className="grid grid-cols-2 md:grid-cols-3 gap-3"
      >
        {INTERESTS.map((interest, index) => {
          const selected = isSelected(interest)
          const disabled = !selected && isMaxReached

          return (
            <motion.button
              key={interest}
              type="button"
              onClick={() => !disabled && onToggle(interest)}
              disabled={disabled}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                show: { opacity: 1, scale: 1 }
              }}
              whileHover={!disabled ? { scale: 1.05, y: -3 } : {}}
              whileTap={!disabled ? { scale: 0.95 } : {}}
              className={`
                px-4 py-3 rounded-xl font-bold text-sm md:text-base
                transition-all duration-300 border-2
                ${selected
                  ? 'bg-gradient-to-br from-gold to-yellow-400 text-white border-yellow-600 shadow-lg'
                  : disabled
                    ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed opacity-50'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gold hover:bg-gradient-to-br hover:from-yellow-50 hover:to-yellow-100'
                }
              `}
            >
              {selected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-block ml-2"
                >
                  ✓
                </motion.span>
              )}
              {interest}
            </motion.button>
          )
        })}
      </motion.div>

      {/* Help Text */}
      {selectedInterests.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center text-sm text-gray-500 font-medium"
        >
          حداقل یک علاقه را انتخاب کنید
        </motion.p>
      )}

      {isMaxReached && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center text-sm text-red-600 font-bold"
        >
          حداکثر {maxSelection} علاقه می‌توانید انتخاب کنید
        </motion.p>
      )}
    </div>
  )
}
