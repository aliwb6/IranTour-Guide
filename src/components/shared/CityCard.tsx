'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface CityCardProps {
  name: string;
  slug: string;
  eventCount?: number;
  image?: string;
  delay?: number;
}

export function CityCard({ name, slug, eventCount, image, delay = 0 }: CityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10 }}
    >
      <Link href={`/events?city=${slug}`}>
        <div className="kashi-card overflow-hidden cursor-pointer">
          <div className="image-overlay h-48">
            <Image
              src={image || `/images/cities/${slug}.jpg`}
              alt={name}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

            <div className="absolute bottom-4 right-4 left-4 z-20">
              <h3 className="text-2xl md:text-3xl font-black text-yellow-200 drop-shadow-lg mb-2">
                {name}
              </h3>
              {eventCount !== undefined && (
                <p className="text-sm md:text-base text-yellow-100 font-semibold">
                  {eventCount} رویداد فعال
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
