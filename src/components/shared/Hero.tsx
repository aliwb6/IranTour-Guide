'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, ChevronDown } from 'lucide-react'

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[600px] md:min-h-[600px] kashi-star-pattern overflow-hidden">
      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-gold/10 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center justify-center min-h-[600px] md:min-h-[600px] text-center">
        {/* Main Heading with Fade-in Animation */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-yellow-100 mb-4 leading-tight drop-shadow-2xl"
        >
          رویدادهای فرهنگی و گردشگری ایران
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-2xl text-yellow-50 mb-8 drop-shadow-lg max-w-3xl font-bold"
        >
          کشف و تجربه بهترین رویدادهای ایران با هوش مصنوعی
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="w-full max-w-3xl mb-8"
        >
          <div className="kashi-search p-3 md:p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            <div className="flex-1 flex items-center gap-3 px-4 py-2 md:py-0">
              <Search className="w-6 h-6 text-red-900" />
              <input
                type="text"
                placeholder="جستجوی رویداد، شهر، موضوع..."
                className="flex-1 outline-none text-base md:text-lg font-bold bg-transparent text-gray-800 placeholder-gray-600"
              />
            </div>
            <button className="deep-persian-btn px-8 py-3 md:py-3.5 font-black text-base md:text-lg">
              🔍 جستجو
            </button>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          <Link href="/events">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="deep-persian-btn px-8 py-4 text-lg font-black"
            >
              مشاهده رویدادها
            </motion.button>
          </Link>
          <Link href="/ai-suggest">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-lg rounded-xl bg-white/90 border-2 border-gold text-red-900 font-black hover:bg-gold hover:text-white transition-colors"
            >
              پیشنهاد هوشمند
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { duration: 1, delay: 1 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-8"
        >
          <ChevronDown className="w-8 h-8 text-yellow-200" />
        </motion.div>
      </div>
    </section>
  )
}
