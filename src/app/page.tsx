'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { EventCard } from '@/components/events/EventCard'

export default function HomePage() {
  const [eventCount, setEventCount] = useState(0)
  const [cityCount, setCityCount] = useState(0)
  const [topicCount, setTopicCount] = useState(0)

  // Counter animation effect
  useEffect(() => {
    const animateCounter = (target: number, setter: (val: number) => void) => {
      let current = 0
      const increment = Math.ceil(target / 50)
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setter(target)
          clearInterval(timer)
        } else {
          setter(current)
        }
      }, 30)
    }

    animateCounter(250, setEventCount)
    animateCounter(31, setCityCount)
    animateCounter(15, setTopicCount)
  }, [])

  // Sample featured events data
  const featuredEvents = [
    {
      title: 'جشنواره فیلم فجر ۱۴۰۴',
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
      badge: 'هنری',
      date: '۱۰ بهمن ۱۴۰۴',
      location: 'تهران',
      description:
        'چهل و سومین دوره جشنواره فیلم فجر با حضور بهترین فیلم‌سازان ایرانی. نمایش فیلم‌های برتر سینمای ایران و مسابقه در بخش‌های مختلف.',
      slug: 'fajr-film-festival-1404',
    },
    {
      title: 'جشن نوروز ۱۴۰۴',
      image: 'https://images.unsplash.com/photo-1553696590-4b3f68898333?w=800',
      badge: 'ملی',
      date: '۱ فروردین ۱۴۰۴',
      location: 'سراسر ایران',
      description:
        'آغاز سال نو ایرانی با جشن‌های سنتی، هفت‌سین، و سفره‌های رنگارنگ. جشن بزرگ تحویل سال در تمام شهرهای ایران با برگزاری مراسم‌های ویژه.',
      slug: 'nowruz-1404',
    },
    {
      title: 'گلاب‌گیری کاشان',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800',
      badge: 'گردشگری',
      date: '۱۵ اردیبهشت ۱۴۰۴',
      location: 'کاشان، قمصر',
      description:
        'جشنواره سنتی گلاب‌گیری در قمصر کاشان. تماشای فرآیند استخراج گلاب از گل محمدی و تجربه عطر دلنشین باغ‌های گل.',
      slug: 'rose-water-kashan',
    },
  ]

  // Popular topics
  const popularTopics = [
    { icon: '🎭', title: 'نوروز', slug: 'nowruz' },
    { icon: '🕌', title: 'مراسم مذهبی', slug: 'religious' },
    { icon: '🎬', title: 'سینما و فیلم', slug: 'cinema' },
    { icon: '🏔️', title: 'طبیعت‌گردی', slug: 'nature' },
    { icon: '⚔️', title: 'محرم و عاشورا', slug: 'muharram' },
    { icon: '🌙', title: 'شب یلدا', slug: 'yalda' },
    { icon: '🔥', title: 'چهارشنبه‌سوری', slug: 'chaharshanbe-suri' },
    { icon: '🌱', title: 'سیزده‌بدر', slug: 'sizdah-bedar' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[700px] deep-carpet-bg kashi-star-pattern text-white overflow-hidden">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10">
          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-2xl slide-in-right">
            رویدادهای ایران ۲۰۲۵–۲۰۲۶
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-3xl mb-10 max-w-3xl font-medium drop-shadow-lg text-light-gold fade-in">
            کشف و تجربه فرهنگ، هنر و جشن‌های ایران
          </p>

          {/* Search Bar */}
          <div className="persian-search-box fade-in">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجوی رویداد، شهر یا موضوع..."
                className="w-full px-6 py-5 pr-14 rounded-xl text-lg text-gray-900 focus:outline-none shadow-2xl"
              />
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 h-6 w-6 text-persian-red" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 md:gap-16 mt-16 w-full max-w-4xl fade-in">
            <div className="text-center">
              <div className="stat-number">{eventCount}+</div>
              <div className="text-sm md:text-base mt-2 font-semibold text-light-gold">
                رویداد ثبت شده
              </div>
            </div>
            <div className="text-center">
              <div className="stat-number">{cityCount}+</div>
              <div className="text-sm md:text-base mt-2 font-semibold text-light-gold">شهر</div>
            </div>
            <div className="text-center">
              <div className="stat-number">{topicCount}+</div>
              <div className="text-sm md:text-base mt-2 font-semibold text-light-gold">موضوع</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black gradient-text flex items-center gap-3">
            <span className="text-5xl">🌟</span>
            رویدادهای ویژه
          </h2>
          <Link
            href="/events"
            className="deep-persian-btn text-sm hidden md:inline-block hover:scale-105 transition-transform"
          >
            مشاهده همه →
          </Link>
        </div>

        {/* Divider */}
        <div className="kashi-divider mb-12"></div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event, index) => (
            <div key={index} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <EventCard {...event} />
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <Link href="/events" className="deep-persian-btn inline-block">
            مشاهده همه رویدادها →
          </Link>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black gradient-text mb-4 text-center flex items-center justify-center gap-3">
            <span className="text-5xl">🏛️</span>
            موضوعات محبوب
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            کشف رویدادها بر اساس موضوعات مورد علاقه شما
          </p>

          {/* Divider */}
          <div className="kashi-divider mb-12"></div>

          {/* Topics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {popularTopics.map((topic, index) => (
              <Link
                key={index}
                href={`/events?topic=${topic.slug}`}
                className="deep-tag text-center py-4 px-6 flex flex-col items-center gap-2 fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="text-3xl">{topic.icon}</span>
                <span className="font-bold">{topic.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="kashi-card max-w-4xl mx-auto p-12 text-center">
          <div className="tile-corner top-right"></div>
          <div className="tile-corner bottom-left"></div>

          <span className="text-6xl mb-6 inline-block">🎯</span>
          <h2 className="text-3xl md:text-4xl font-black gradient-text mb-4">
            رویداد خود را ثبت کنید
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            سازمان یا برگزارکننده رویداد هستید؟ رویداد خود را به صورت رایگان ثبت کنید و به هزاران نفر
            معرفی کنید.
          </p>
          <Link
            href="/submit-event"
            className="deep-persian-btn text-lg px-8 py-4 inline-block hover:scale-105 transition-transform"
          >
            افزودن رویداد جدید ✨
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-persian-red to-deep-red text-white">
        <div className="container mx-auto px-4 text-center">
          <span className="text-5xl mb-4 inline-block">📬</span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">از رویدادهای جدید باخبر شوید</h2>
          <p className="text-light-gold mb-8 max-w-2xl mx-auto">
            با عضویت در خبرنامه، جدیدترین رویدادها و جشنواره‌ها را مستقیم در ایمیل خود دریافت کنید
          </p>
          <form className="max-w-md mx-auto flex gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="ایمیل شما"
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-gold"
            />
            <button type="submit" className="bg-gold hover:bg-light-gold text-deep-red font-bold px-8 py-4 rounded-lg transition-all hover:scale-105">
              عضویت
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
