'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const topics = [
  { name: "نوروز", count: 45 },
  { name: "محرم و عاشورا", count: 32 },
  { name: "جشنواره فیلم", count: 28 },
  { name: "سینما", count: 35 },
  { name: "موسیقی", count: 52 },
  { name: "طبیعت‌گردی", count: 67 },
  { name: "شب یلدا", count: 24 },
  { name: "چهارشنبه‌سوری", count: 19 },
  { name: "سیزده‌بدر", count: 21 },
  { name: "نمایشگاه", count: 41 },
  { name: "علمی و پژوهشی", count: 38 },
  { name: "گردشگری", count: 73 },
]

// Calculate relative size based on popularity
const getTagSize = (count: number) => {
  const max = Math.max(...topics.map(t => t.count))
  const min = Math.min(...topics.map(t => t.count))
  const ratio = (count - min) / (max - min)

  if (ratio > 0.7) return 'text-2xl md:text-3xl px-6 py-3'
  if (ratio > 0.4) return 'text-xl md:text-2xl px-5 py-2.5'
  return 'text-lg md:text-xl px-4 py-2'
}

export const PopularTopics: React.FC = () => {
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
          <h2 className="text-4xl md:text-5xl font-black text-red-900 mb-4">
            🎯 موضوعات محبوب
          </h2>
          <p className="text-xl text-gray-700 font-bold">
            رویدادهای پرطرفدار را بر اساس موضوع کشف کنید
          </p>
        </motion.div>

        {/* Topics Cloud */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.08 }
            }
          }}
          className="flex flex-wrap justify-center gap-3 md:gap-4"
        >
          {topics.map((topic, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                show: { opacity: 1, scale: 1 }
              }}
            >
              <Link href={`/events?topic=${encodeURIComponent(topic.name)}`}>
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`deep-tag ${getTagSize(topic.count)} inline-block cursor-pointer`}
                >
                  {topic.name}
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 font-medium">
            به دنبال موضوع خاصی می‌گردید؟
          </p>
          <Link href="/events">
            <span className="text-red-900 font-black underline hover:text-gold transition-colors">
              جستجو در همه رویدادها
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
