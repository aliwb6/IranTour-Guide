// src/app/page.tsx

import Link from 'next/link'
import { mockEvents } from '@/lib/mock-data/events'
import EventCard from '@/components/events/EventCard'

export default function HomePage() {
  const featuredEvents = mockEvents.filter((event) => event.featured).slice(0, 6)

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="kashi-star-pattern py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-red-900 mb-6 leading-tight">
            کشف رویدادهای شگفت‌انگیز
            <br />
            <span className="text-gold">ایران</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-bold mb-8 max-w-3xl mx-auto leading-relaxed">
            از جشن‌های سنتی تا رویدادهای هنری، همه چیز را در یک جا پیدا کنید
          </p>

          {/* دکمه‌های CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/events" className="deep-persian-btn px-8 py-4 text-lg font-black">
              🎭 مشاهده همه رویدادها
            </Link>
            <Link
              href="/calendar"
              className="px-8 py-4 text-lg rounded-xl border-2 border-red-900 text-red-900 font-black hover:bg-red-900 hover:text-yellow-200 transition"
            >
              📅 تقویم رویدادها
            </Link>
          </div>
        </div>
      </section>

      {/* آمار */}
      <section className="py-16 bg-white border-y-4 border-gold">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-5xl font-black text-red-900 mb-2">500+</p>
              <p className="text-lg font-bold text-gray-700">رویداد فرهنگی</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-black text-red-900 mb-2">31</p>
              <p className="text-lg font-bold text-gray-700">شهر ایران</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-black text-red-900 mb-2">12</p>
              <p className="text-lg font-bold text-gray-700">دسته‌بندی</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-black text-red-900 mb-2">10k+</p>
              <p className="text-lg font-bold text-gray-700">بازدید ماهانه</p>
            </div>
          </div>
        </div>
      </section>

      {/* رویدادهای ویژه */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-red-900 mb-4">
              ⭐ رویدادهای ویژه
            </h2>
            <p className="text-xl text-gray-700 font-bold">
              بهترین و محبوب‌ترین رویدادهای فرهنگی و هنری ایران
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/events" className="deep-persian-btn px-8 py-4 font-black inline-block">
              مشاهده همه رویدادها ←
            </Link>
          </div>
        </div>
      </section>

      {/* دسته‌بندی‌ها */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-red-900 mb-4">
              🎯 رویدادها بر اساس نوع
            </h2>
            <p className="text-xl text-gray-700 font-bold">
              رویداد مورد علاقه خود را پیدا کنید
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'ملی', icon: '🏛️', color: 'red' },
              { name: 'مذهبی', icon: '🕌', color: 'green' },
              { name: 'هنری', icon: '🎭', color: 'purple' },
              { name: 'علمی', icon: '📚', color: 'blue' },
              { name: 'گردشگری', icon: '🗺️', color: 'yellow' },
              { name: 'فرهنگی', icon: '📜', color: 'orange' },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/events?type=${category.name}`}
                className="kashi-card p-6 text-center hover:scale-105 transition cursor-pointer group"
              >
                <div className="text-5xl mb-3">{category.icon}</div>
                <p className="font-black text-red-900 group-hover:text-red-700 transition">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA نهایی */}
      <section className="py-20 kashi-star-pattern">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-red-900 mb-6">
            رویداد خود را ثبت کنید
          </h2>
          <p className="text-xl text-gray-700 font-bold mb-8 leading-relaxed">
            اگر رویداد فرهنگی، هنری یا گردشگری دارید، آن را با ما به اشتراک بگذارید
          </p>
          <Link href="/submit-event" className="deep-persian-btn px-10 py-5 text-xl font-black inline-block">
            ➕ افزودن رویداد جدید
          </Link>
        </div>
      </section>
    </div>
  )
}
