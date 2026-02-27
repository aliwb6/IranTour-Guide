'use client'

import { SubmitEventForm } from '@/components/forms/SubmitEventForm'

export default function SubmitEventPage() {
  return (
    <div className="min-h-screen bg-cream">
      <section className="kashi-star-pattern py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-yellow-100 mb-6 drop-shadow-lg">
            ✏️ افزودن رویداد جدید
          </h1>
          <p className="text-xl text-yellow-50 font-bold drop-shadow">
            رویداد فرهنگی، هنری یا گردشگری خود را با ما به اشتراک بگذارید
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="kashi-card p-6 md:p-10">
          <SubmitEventForm />
        </div>
      </div>
    </div>
  )
}
