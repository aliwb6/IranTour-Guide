'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface StatisticsCardProps {
  label: string
  value: number
  icon: LucideIcon
  link?: string
  index?: number
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({
  label,
  value,
  icon: Icon,
  link,
  index = 0
}) => {
  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={link ? { y: -5, scale: 1.02 } : {}}
      className={`tile-stats p-6 text-center ${link ? 'cursor-pointer' : ''}`}
    >
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
          <Icon className="w-8 h-8 text-red-900" />
        </div>
      </div>

      <div className="text-4xl font-black text-gold mb-2">
        {value.toLocaleString('fa-IR')}
      </div>

      <div className="text-sm font-bold text-gray-800">
        {label}
      </div>
    </motion.div>
  )

  if (link) {
    return <Link href={link}>{content}</Link>
  }

  return content
}
