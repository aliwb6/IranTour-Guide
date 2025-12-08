'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Check, AlertCircle } from 'lucide-react'

const benefits = [
  "دریافت رویدادهای جدید هر هفته",
  "پیشنهادهای ویژه گردشگری",
  "اطلاع از جشنواره‌های مهم"
]

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setMessage('لطفاً یک ایمیل معتبر وارد کنید')
      return
    }

    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('با موفقیت در خبرنامه عضو شدید!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'خطایی رخ داد. لطفاً دوباره تلاش کنید')
      }
    } catch (error) {
      setStatus('error')
      setMessage('خطا در اتصال. لطفاً دوباره تلاش کنید')
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus('idle')
      setMessage('')
    }, 5000)
  }

  return (
    <section className="py-16 relative overflow-hidden bg-white">
      {/* Persian Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 20px, var(--persian-red) 20px, var(--persian-red) 22px),
            repeating-linear-gradient(-45deg, transparent, transparent 20px, var(--gold) 20px, var(--gold) 22px)
          `
        }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="kashi-card p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Right: Benefits */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-10 h-10 text-red-900" />
                <h2 className="text-3xl md:text-4xl font-black text-red-900">
                  عضویت در خبرنامه
                </h2>
              </div>

              <p className="text-lg text-gray-700 font-bold mb-6">
                از آخرین رویدادهای فرهنگی و گردشگری ایران باخبر شوید
              </p>

              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-800 font-bold">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Left: Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ایمیل خود را وارد کنید"
                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-gold outline-none text-lg font-bold transition-colors"
                    disabled={status === 'loading'}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                  whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                  disabled={status === 'loading'}
                  className={`w-full deep-persian-btn px-6 py-4 text-lg font-black flex items-center justify-center gap-3 ${
                    status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      در حال ثبت...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      عضویت در خبرنامه
                    </>
                  )}
                </motion.button>

                {/* Status Messages */}
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl flex items-center gap-3 ${
                      status === 'success'
                        ? 'bg-green-50 text-green-800 border-2 border-green-200'
                        : 'bg-red-50 text-red-800 border-2 border-red-200'
                    }`}
                  >
                    {status === 'success' ? (
                      <Check className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    <span className="font-bold">{message}</span>
                  </motion.div>
                )}
              </form>

              <p className="text-sm text-gray-500 mt-4 text-center font-medium">
                ایمیل شما محفوظ می‌ماند و برای اهداف تبلیغاتی استفاده نخواهد شد
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
