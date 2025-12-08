'use client'

import React from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { Calendar, MapPin, Building2, Users } from 'lucide-react'

interface StatItem {
  label: string
  value: number
  icon: React.ElementType
  suffix: string
}

const stats: StatItem[] = [
  { label: "رویدادهای ثبت‌شده", value: 200, icon: Calendar, suffix: "+" },
  { label: "شهرهای ایران", value: 15, icon: MapPin, suffix: "+" },
  { label: "سازمان‌ها", value: 50, icon: Building2, suffix: "+" },
  { label: "بازدید ماهانه", value: 10000, icon: Users, suffix: "+" }
]

// Helper to convert to Persian numbers
const toPersianNumber = (num: number): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)])
}

export const Stats: React.FC = () => {
  return (
    <section className="py-16 bg-white border-y-4 border-gold relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, var(--gold) 10px, var(--gold) 11px)`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="tile-stats p-6 md:p-8 text-center cursor-pointer"
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <Icon className="w-10 h-10 md:w-12 md:h-12 text-red-900" strokeWidth={2.5} />
                </div>

                {/* Counter */}
                <div className="text-3xl md:text-5xl font-black text-gold mb-2">
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    separator=","
                    enableScrollSpy
                    scrollSpyOnce
                  >
                    {({ countUpRef }) => (
                      <span ref={countUpRef} className="inline-block" />
                    )}
                  </CountUp>
                  <span className="text-gold">{stat.suffix}</span>
                </div>

                {/* Label */}
                <div className="text-sm md:text-base font-bold text-gray-800">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
