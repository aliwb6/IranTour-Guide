'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="kashi-card p-12 text-center"
    >
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
          <Icon className="w-12 h-12 text-gray-400" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-black text-gray-800 mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 font-medium mb-6 max-w-md mx-auto">
        {description}
      </p>

      {/* Action Button */}
      {(actionLabel && (actionHref || onAction)) && (
        <div>
          {actionHref ? (
            <Link href={actionHref}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="deep-persian-btn px-8 py-3 font-black inline-block"
              >
                {actionLabel}
              </motion.button>
            </Link>
          ) : (
            <motion.button
              onClick={onAction}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="deep-persian-btn px-8 py-3 font-black"
            >
              {actionLabel}
            </motion.button>
          )}
        </div>
      )}
    </motion.div>
  )
}
