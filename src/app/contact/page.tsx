// src/app/contact/page.tsx
'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('پیام شما با موفقیت ارسال شد! ✅')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="kashi-star-pattern py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-red-900 mb-6">
            📞 تماس با ما
          </h1>
          <p className="text-xl text-gray-700 font-bold">
            سوال، پیشنهاد یا انتقاد خود را با ما در میان بگذارید
          </p>
        </div>
      </section>

      {/* محتوا */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* فرم تماس */}
          <div className="lg:col-span-2">
            <div className="kashi-card p-8">
              <h2 className="text-2xl font-black text-red-900 mb-6">
                📧 فرم تماس
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* نام */}
                <div>
                  <label className="block text-gray-700 font-black mb-2">
                    نام و نام خانوادگی *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gold focus:border-red-900 focus:outline-none font-bold"
                    placeholder="نام خود را وارد کنید"
                  />
                </div>

                {/* ایمیل */}
                <div>
                  <label className="block text-gray-700 font-black mb-2">
                    ایمیل *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gold focus:border-red-900 focus:outline-none font-bold"
                    placeholder="example@email.com"
                  />
                </div>

                {/* موضوع */}
                <div>
                  <label className="block text-gray-700 font-black mb-2">
                    موضوع *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gold focus:border-red-900 focus:outline-none font-bold"
                    placeholder="موضوع پیام"
                  />
                </div>

                {/* پیام */}
                <div>
                  <label className="block text-gray-700 font-black mb-2">
                    پیام *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gold focus:border-red-900 focus:outline-none font-bold resize-none"
                    placeholder="پیام خود را بنویسید..."
                  />
                </div>

                {/* دکمه ارسال */}
                <button type="submit" className="deep-persian-btn w-full px-6 py-4 font-black">
                  ارسال پیام ←
                </button>
              </form>
            </div>
          </div>

          {/* اطلاعات تماس */}
          <div className="lg:col-span-1 space-y-6">
            {/* ایمیل */}
            <div className="kashi-card p-6 text-center">
              <div className="text-4xl mb-3">📧</div>
              <h3 className="text-lg font-black text-red-900 mb-2">ایمیل</h3>
              <a
                href="mailto:info@irantour-guide.com"
                className="text-gray-700 font-bold hover:text-red-900 transition"
              >
                info@irantour-guide.com
              </a>
            </div>

            {/* تلفن */}
            <div className="kashi-card p-6 text-center">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="text-lg font-black text-red-900 mb-2">تلفن پشتیبانی</h3>
              <p className="text-gray-700 font-bold">021-1234-5678</p>
            </div>

            {/* ساعات کاری */}
            <div className="kashi-card p-6 text-center">
              <div className="text-4xl mb-3">🕐</div>
              <h3 className="text-lg font-black text-red-900 mb-2">ساعات کاری</h3>
              <p className="text-gray-700 font-bold">
                شنبه تا چهارشنبه
                <br />
                9 صبح تا 6 عصر
              </p>
            </div>

            {/* شبکه‌های اجتماعی */}
            <div className="kashi-card p-6 text-center">
              <div className="text-4xl mb-3">🌐</div>
              <h3 className="text-lg font-black text-red-900 mb-4">شبکه‌های اجتماعی</h3>
              <div className="flex justify-center gap-3">
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-red-900 text-yellow-200 flex items-center justify-center hover:scale-110 transition font-bold text-lg"
                >
                  T
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-red-900 text-yellow-200 flex items-center justify-center hover:scale-110 transition font-bold text-lg"
                >
                  I
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-red-900 text-yellow-200 flex items-center justify-center hover:scale-110 transition font-bold text-lg"
                >
                  L
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
