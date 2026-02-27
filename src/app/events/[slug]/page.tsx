// src/app/events/[slug]/page.tsx

import { notFound } from 'next/navigation'
import { mockEvents } from '@/lib/mock-data/events'
import ImageGallery from '@/components/events/ImageGallery'
import ShareButtons from '@/components/shared/ShareButtons'
import RelatedEvents from '@/components/events/RelatedEvents'
import ReviewForm from '@/components/reviews/ReviewForm'
import ReviewList from '@/components/reviews/ReviewList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params
  const event = mockEvents.find((e) => e.slug === slug)

  if (!event) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-')
    const months = [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند',
    ]
    return `${day} ${months[parseInt(month) - 1]} ${year}`
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.shortDescription,
    startDate: event.startDate,
    endDate: event.endDate,
    location: {
      '@type': 'Place',
      name: event.venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.city,
        addressCountry: 'IR',
      },
    },
    image: event.image,
    organizer: event.organizerName ? {
      '@type': 'Organization',
      name: event.organizerName,
      url: event.website || undefined,
    } : undefined,
  }

  return (
    <div className="min-h-screen bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>

        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-12 w-full">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm text-yellow-200">
                <Link href="/" className="hover:text-yellow-100 transition">
                  خانه
                </Link>
                <span>›</span>
                <Link href="/events" className="hover:text-yellow-100 transition">
                  رویدادها
                </Link>
                <span>›</span>
                <span className="text-yellow-100 font-bold">{event.title}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-start gap-4 mb-6">
              <span className="kashi-badge text-sm px-4 py-2">{event.type}</span>
              <span className="kashi-badge text-sm px-4 py-2">{event.style}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-yellow-200 mb-4 drop-shadow-2xl">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-yellow-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📅</span>
                <span className="font-bold">
                  {formatDate(event.startDate)}
                  {event.startDate !== event.endDate && ` تا ${formatDate(event.endDate)}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📍</span>
                <span className="font-bold">{event.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏛️</span>
                <span className="font-bold">{event.venue}</span>
              </div>
            </div>

            {event.registrationUrl && (
              <div className="mt-6">
                <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold text-lg px-8 py-6 shadow-2xl">
                  <Link href={`/events/${event.slug}/book`}>
                    🎟️ رزرو این رویداد
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="kashi-card p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-black text-red-900 mb-6 flex items-center gap-3">
                <span>📝</span>
                درباره رویداد
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line font-medium text-base md:text-lg">
                  {event.description}
                </p>
              </div>
            </section>

            {event.images && event.images.length > 0 && (
              <section className="kashi-card p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-black text-red-900 mb-6 flex items-center gap-3">
                  <span>📸</span>
                  گالری تصاویر
                </h2>
                <ImageGallery images={event.images} title={event.title} />
              </section>
            )}

            {(event.organizerName || event.website || event.organizerPhone) && (
              <section className="kashi-card p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-black text-red-900 mb-6 flex items-center gap-3">
                  <span>📞</span>
                  اطلاعات تماس
                </h2>
                <div className="space-y-4">
                  {event.organizerName && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1 font-bold">برگزارکننده</p>
                      <p className="text-lg font-black text-gray-800">{event.organizerName}</p>
                    </div>
                  )}
                  {event.organizerPhone && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1 font-bold">تلفن</p>
                      <a
                        href={`tel:${event.organizerPhone}`}
                        className="text-lg font-black text-red-900 hover:text-red-700 transition"
                      >
                        {event.organizerPhone}
                      </a>
                    </div>
                  )}
                  {event.website && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1 font-bold">وب‌سایت</p>
                      <a
                        href={event.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-black text-red-900 hover:text-red-700 transition"
                      >
                        مشاهده وب‌سایت رسمی
                      </a>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <div className="kashi-card p-6">
                <h3 className="text-xl font-black text-red-900 mb-6">اطلاعات کلیدی</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1 font-bold">📅 تاریخ شروع</p>
                    <p className="text-base font-black text-gray-800">
                      {formatDate(event.startDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1 font-bold">📅 تاریخ پایان</p>
                    <p className="text-base font-black text-gray-800">
                      {formatDate(event.endDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1 font-bold">📍 شهر</p>
                    <p className="text-base font-black text-gray-800">{event.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1 font-bold">🏛️ محل برگزاری</p>
                    <p className="text-base font-black text-gray-800">{event.venue}</p>
                  </div>
                  {event.address && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1 font-bold">🗺️ آدرس</p>
                      <p className="text-sm font-bold text-gray-700 leading-relaxed">
                        {event.address}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="kashi-card p-6 space-y-3">
                {event.registrationUrl && (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="deep-persian-btn w-full px-6 py-4 text-center font-black block"
                  >
                    🎟️ ثبت‌نام در رویداد
                  </a>
                )}
                <button className="w-full px-6 py-3 rounded-xl border-2 border-red-900 text-red-900 font-black hover:bg-red-900 hover:text-yellow-200 transition text-center">
                  📅 افزودن به تقویم
                </button>
                <button className="w-full px-6 py-3 rounded-xl border-2 border-red-900 text-red-900 font-black hover:bg-red-900 hover:text-yellow-200 transition text-center">
                  ❤️ ذخیره کردن
                </button>
              </div>

              <div className="kashi-card p-6">
                <h3 className="text-lg font-black text-red-900 mb-4">📤 اشتراک‌گذاری</h3>
                <ShareButtons
                  title={event.title}
                  url={`https://irantour-guide.vercel.app/events/${event.slug}`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 space-y-16">
          {/* Reviews Section */}
          <section className="kashi-card p-8">
            <h2 className="text-3xl md:text-4xl font-black text-red-900 mb-8 flex items-center gap-3">
              <span>⭐</span>
              نظرات شرکت‌کنندگان
            </h2>

            {/* Review Form */}
            <div className="mb-12 p-6 bg-gradient-to-br from-yellow-50 to-white rounded-2xl border-2 border-yellow-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">نظر خود را بنویسید</h3>
              <ReviewForm eventId={event.slug} />
            </div>

            {/* Review List */}
            <ReviewList eventId={event.slug} />
          </section>

          {/* Related Events */}
          <RelatedEvents currentEvent={event} />
        </div>
      </div>
    </div>
  )
}
