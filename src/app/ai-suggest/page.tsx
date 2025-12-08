'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MessageSquare, Calendar, Sparkles, CheckCircle, Zap, Brain, Map } from 'lucide-react'

const steps = [
  {
    step: 1,
    icon: MessageSquare,
    title: "علایق خود را بنویسید",
    description: "درباره خودتان و چیزهایی که دوست دارید بگویید"
  },
  {
    step: 2,
    icon: Calendar,
    title: "تاریخ و مقصد را انتخاب کنید",
    description: "تاریخ سفر و شهرهای مورد نظرتان را مشخص کنید"
  },
  {
    step: 3,
    icon: Sparkles,
    title: "پیشنهادهای هوشمند دریافت کنید",
    description: "برنامه سفر کامل با بهترین رویدادها"
  }
]

const benefits = [
  {
    icon: Brain,
    title: "هوشمند و شخصی‌سازی شده",
    description: "پیشنهادات بر اساس علایق و سلیقه شما"
  },
  {
    icon: Map,
    title: "برنامه سفر کامل",
    description: "برنامه روزانه با رویدادها و فعالیت‌ها"
  },
  {
    icon: Zap,
    title: "سریع و آسان",
    description: "تنها در چند دقیقه نتیجه بگیرید"
  },
  {
    icon: CheckCircle,
    title: "رویدادهای تایید شده",
    description: "فقط بهترین و معتبرترین رویدادها"
  }
]

export default function AISuggestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 opacity-95" />
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
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Icon */}
            <motion.div
              className="flex justify-center mb-6"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-16 h-16 text-gold" />
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              پیشنهاد هوشمند سفر با AI
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-blue-100 mb-4 font-bold">
              با هوش مصنوعی، بهترین برنامه سفر و رویدادهای مناسب شما را پیدا کنید
            </p>

            {/* Description */}
            <p className="text-lg text-blue-200 mb-10 max-w-3xl mx-auto">
              فقط کافیه درباره علایق و برنامه سفرتون بگید، بقیه‌اش با ماست!
            </p>

            {/* CTA Button */}
            <Link href="/ai-suggest/form">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-gold to-yellow-400 hover:from-yellow-400 hover:to-gold text-purple-900 px-10 py-5 rounded-xl font-black text-xl transition-all shadow-2xl inline-flex items-center gap-3"
              >
                <Sparkles className="w-6 h-6" />
                شروع کنید
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-red-900 mb-4">
              چطور کار می‌کنه؟
            </h2>
            <p className="text-xl text-gray-700 font-bold">
              فقط سه قدم ساده تا برنامه سفر ایده‌آل
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="kashi-card p-8 text-center h-full">
                    {/* Step Number */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                      <span className="text-white font-black">{step.step}</span>
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                        <Icon className="w-10 h-10 text-purple-900" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-black text-red-900 mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-700 font-medium">
                      {step.description}
                    </p>
                  </div>

                  {/* Connector Arrow (desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -left-4 w-8 h-0.5 bg-gold transform -translate-y-1/2" />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-red-900 mb-4">
              چرا پیشنهاد هوشمند؟
            </h2>
            <p className="text-xl text-gray-700 font-bold">
              مزایای استفاده از سیستم پیشنهاد هوشمند سفر
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="tile-stats p-6 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <Icon className="w-12 h-12 text-red-900" />
                  </div>
                  <h3 className="text-xl font-black text-red-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-700 font-medium text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-red-900 via-purple-900 to-indigo-900 relative overflow-hidden">
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

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              آماده برای سفر بعدی؟
            </h2>
            <p className="text-xl text-blue-100 mb-8 font-bold">
              همین الان شروع کنید و برنامه سفر شخصی خودتون رو بسازید
            </p>

            <Link href="/ai-suggest/form">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(212, 175, 55, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gold hover:bg-yellow-400 text-purple-900 px-12 py-6 rounded-xl font-black text-2xl transition-all shadow-2xl inline-flex items-center gap-3"
              >
                <Sparkles className="w-7 h-7" />
                شروع کنید - رایگان!
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
