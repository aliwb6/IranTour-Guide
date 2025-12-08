'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, X, Plus, Calendar } from 'lucide-react'
import { EmptyState } from '@/components/profile/EmptyState'

interface ImageWithFallbackProps {
  cityId: string
  src: string
  alt: string
  className?: string
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ cityId, src, alt, className }) => {
  const [imageError, setImageError] = useState(false)
  const fallbackImage = 'https://via.placeholder.com/800x600/D4AF37/FFFFFF?text=' + encodeURIComponent(alt)

  return (
    <Image
      src={imageError ? fallbackImage : src}
      alt={alt}
      fill
      className={className}
      onError={() => setImageError(true)}
      unoptimized
    />
  )
}

interface City {
  id: string
  name: string
  slug: string
  image: string
  eventCount: number
}

const mockCities: City[] = [
  {
    id: '1',
    name: 'تهران',
    slug: 'tehran',
    image: 'https://images.unsplash.com/photo-1585916420730-d7f95e942d43?w=800',
    eventCount: 85
  },
  {
    id: '2',
    name: 'اصفهان',
    slug: 'isfahan',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
    eventCount: 42
  },
  {
    id: '3',
    name: 'شیراز',
    slug: 'shiraz',
    image: 'https://images.unsplash.com/photo-1546785939-8e899ac0f0a4?w=800',
    eventCount: 38
  }
]

export default function FollowedCitiesPage() {
  const [cities, setCities] = useState(mockCities)

  const handleUnfollow = (cityId: string) => {
    if (confirm('آیا مطمئن هستید که می‌خواهید این شهر را دنبال نکنید؟')) {
      setCities(prev => prev.filter(c => c.id !== cityId))
    }
  }

  if (cities.length === 0) {
    return (
      <EmptyState
        icon={MapPin}
        title="شهر دنبال‌شده‌ای ندارید"
        description="با دنبال کردن شهرهای مورد علاقه، از رویدادهای جدید آن‌ها با خبر شوید"
        actionLabel="مشاهده شهرها"
        actionHref="/cities"
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="kashi-card p-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-red-900 mb-2">
            شهرهای دنبال‌شده
          </h1>
          <p className="text-gray-600 font-medium">
            {cities.length} شهر دنبال می‌کنید
          </p>
        </div>

        <Link href="/cities">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="deep-persian-btn px-6 py-3 font-bold flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            افزودن شهر
          </motion.button>
        </Link>
      </div>

      {/* Cities Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city, index) => (
          <motion.div
            key={city.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="relative group overflow-hidden rounded-2xl"
          >
            {/* Remove Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleUnfollow(city.id)}
              className="absolute top-3 left-3 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
            >
              <X className="w-4 h-4" />
            </motion.button>

            {/* City Image */}
            <div className="relative h-48 bg-gray-200">
              <ImageWithFallback
                cityId={city.id}
                src={city.image}
                alt={city.name}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* City Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5" />
                  <h3 className="text-2xl font-black">
                    {city.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span className="font-bold">{city.eventCount} رویداد</span>
                </div>
              </div>
            </div>

            {/* View Events Button */}
            <Link href={`/cities/${city.slug}`}>
              <motion.div
                whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.95)' }}
                className="bg-gold/90 backdrop-blur-sm p-4 text-center text-white font-black transition-colors"
              >
                مشاهده رویدادها
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
