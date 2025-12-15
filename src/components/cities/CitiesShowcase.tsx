'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

interface City {
  name: string
  slug: string
  image: string
  eventCount: number
}

const cities: City[] = [
  {
    name: 'تهران',
    slug: 'tehran',
    image: 'https://images.unsplash.com/photo-1585916420730-d7f95e942d43?w=800',
    eventCount: 85,
  },
  {
    name: 'اصفهان',
    slug: 'isfahan',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
    eventCount: 42,
  },
  {
    name: 'شیراز',
    slug: 'shiraz',
    image: 'https://images.unsplash.com/photo-1546785939-8e899ac0f0a4?w=800',
    eventCount: 38,
  },
  {
    name: 'مشهد',
    slug: 'mashhad',
    image: 'https://images.unsplash.com/photo-1590655964464-0f90c2598242?w=800',
    eventCount: 56,
  },
  {
    name: 'یزد',
    slug: 'yazd',
    image: 'https://images.unsplash.com/photo-1608017157530-e3d6885c0bb8?w=800',
    eventCount: 24,
  },
  {
    name: 'تبریز',
    slug: 'tabriz',
    image: 'https://images.unsplash.com/photo-1548678967-f1aec58f6fb2?w=800',
    eventCount: 31,
  },
]

const CityCard: React.FC<{ city: City }> = ({ city }) => {
  const [imageError, setImageError] = useState(false)
  const fallbackImage =
    'https://via.placeholder.com/800x600/D4AF37/FFFFFF?text=' + encodeURIComponent(city.name)

  return (
    <Link href={`/cities/${city.slug}`}>
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-2xl h-64 cursor-pointer group"
      >
        {/* City Image */}
        <div className="relative w-full h-full bg-gray-200">
          <Image
            src={imageError ? fallbackImage : city.image}
            alt={city.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImageError(true)}
            unoptimized
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* City Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5" />
            <h3 className="text-2xl md:text-3xl font-black">{city.name}</h3>
          </div>

          {/* Event Count Badge */}
          <div className="inline-block bg-gold/90 backdrop-blur-sm rounded-full px-4 py-1.5">
            <span className="text-white font-black text-sm">{city.eventCount} رویداد</span>
          </div>
        </div>

        {/* Hover Effect - Border */}
        <div className="absolute inset-0 border-4 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
      </motion.div>
    </Link>
  )
}

export const CitiesShowcase: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-red-900 mb-4">🗺️ شهرهای برتر</h2>
          <p className="text-xl text-gray-700 font-bold">
            رویدادهای فرهنگی و گردشگری را در شهرهای مختلف کشف کنید
          </p>
        </motion.div>

        {/* Cities Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cities.map((city) => (
            <motion.div
              key={city.slug}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <CityCard city={city} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Cities Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/cities">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="deep-persian-btn px-8 py-4 font-black inline-block"
            >
              مشاهده همه شهرها ←
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
