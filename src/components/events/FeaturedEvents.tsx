'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Calendar, MapPin } from 'lucide-react'
import moment from 'moment-jalaali'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Event {
  id: string
  title: string
  slug: string
  city: string
  type: string
  startDate: string
  image: string
  shortDescription: string
  featured: boolean
}

interface FeaturedEventsProps {
  events: Event[]
}

const FeaturedEventCard: React.FC<{ event: Event }> = ({ event }) => {
  const [imageError, setImageError] = useState(false)
  const fallbackImage = 'https://via.placeholder.com/800x600/D4AF37/FFFFFF?text=IranTour+Guide'

  return (
    <Link href={`/events/${event.slug}`}>
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
        className="kashi-card overflow-hidden cursor-pointer h-full"
      >
        {/* Event Image */}
        <div className="relative h-64 overflow-hidden bg-gray-200">
          <Image
            src={imageError ? fallbackImage : event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
            onError={() => setImageError(true)}
            unoptimized
          />
          {/* Featured Badge */}
          <div className="absolute top-4 right-4 kashi-badge px-4 py-2 text-sm">ویژه</div>
        </div>

        {/* Event Info */}
        <div className="p-6">
          <h3 className="text-xl md:text-2xl font-black text-red-900 mb-3 line-clamp-2">
            {event.title}
          </h3>

          <p className="text-gray-700 font-medium mb-4 line-clamp-2">{event.shortDescription}</p>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-red-900" />
              <span className="font-bold">
                {moment(event.startDate, 'jYYYY-jMM-jDD').format('jD jMMMM jYYYY')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-900" />
              <span className="font-bold">{event.city}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export const FeaturedEvents: React.FC<FeaturedEventsProps> = ({ events }) => {
  const featuredEvents = events.filter((event) => event.featured)

  if (featuredEvents.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-red-900 mb-4">⭐ رویدادهای ویژه</h2>
          <p className="text-xl text-gray-700 font-bold">
            بهترین و محبوب‌ترین رویدادهای فرهنگی و هنری ایران
          </p>
        </motion.div>

        {/* Swiper Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="!pb-12"
            dir="rtl"
          >
            {featuredEvents.map((event) => (
              <SwiperSlide key={event.id}>
                <FeaturedEventCard event={event} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link href="/events">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="deep-persian-btn px-8 py-4 font-black inline-block"
            >
              مشاهده همه رویدادها ←
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
