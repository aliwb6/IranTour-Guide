'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PlusCircle, Sparkles } from 'lucide-react'

interface CTASectionProps {
  type: 'organizations' | 'ai-suggestions'
}

export const CTASection: React.FC<CTASectionProps> = ({ type }) => {
  if (type === 'organizations') {
    return (
      <section className="relative py-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/95 via-red-900/90 to-transparent" />
        </div>

        {/* Parallax Pattern */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, var(--gold) 20px, var(--gold) 22px)`
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, 40, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <PlusCircle className="w-12 h-12 text-gold" />
              <h2 className="text-4xl md:text-5xl font-black text-white">
                سازمان یا برگزارکننده هستید؟
              </h2>
            </div>

            <p className="text-xl md:text-2xl text-yellow-100 mb-8 font-bold leading-relaxed">
              رویداد خود را ثبت کنید و به میلیون‌ها نفر معرفی کنید
            </p>

            <ul className="space-y-3 mb-10 text-yellow-50">
              <li className="flex items-start gap-3">
                <span className="text-gold text-xl">✓</span>
                <span className="font-bold">دسترسی به بیش از یک میلیون کاربر فعال</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold text-xl">✓</span>
                <span className="font-bold">پنل مدیریت حرفه‌ای برای رویدادها</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold text-xl">✓</span>
                <span className="font-bold">امکان فروش بلیط آنلاین</span>
              </li>
            </ul>

            <Link href="/submit-event">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(212, 175, 55, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gold hover:bg-yellow-400 text-red-900 px-10 py-5 rounded-xl font-black text-xl transition-all shadow-2xl flex items-center gap-3"
              >
                <PlusCircle className="w-6 h-6" />
                افزودن رویداد
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    )
  }

  // AI Suggestions CTA
  return (
    <section className="relative py-20 overflow-hidden">
      {/* AI-themed Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />

      {/* Animated Grid Pattern */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px']
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating Sparkles */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-12 h-12 text-gold" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              پیشنهاد هوشمند سفر
            </h2>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 mb-8 font-bold leading-relaxed max-w-3xl mx-auto">
            با هوش مصنوعی، بهترین رویدادها را برای سفرتان پیدا کنید
          </p>

          <ul className="space-y-3 mb-10 text-blue-50 max-w-2xl mx-auto text-right">
            <li className="flex items-start gap-3">
              <span className="text-gold text-xl">✓</span>
              <span className="font-bold">پیشنهاد شخصی‌سازی شده بر اساس علایق شما</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold text-xl">✓</span>
              <span className="font-bold">برنامه‌ریزی سفر با رویدادهای مناسب</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold text-xl">✓</span>
              <span className="font-bold">کشف رویدادهای منحصر به فرد در مسیر سفر</span>
            </li>
          </ul>

          <Link href="/ai-suggest">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(212, 175, 55, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-gold to-yellow-400 hover:from-yellow-400 hover:to-gold text-purple-900 px-10 py-5 rounded-xl font-black text-xl transition-all shadow-2xl flex items-center gap-3 mx-auto"
            >
              <Sparkles className="w-6 h-6" />
              دریافت پیشنهاد
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
