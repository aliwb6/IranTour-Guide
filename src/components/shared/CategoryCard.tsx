'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  name: string;
  icon: string;
  slug: string;
  color: string;
  delay?: number;
}

export function CategoryCard({ name, icon, slug, color, delay = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <Link href={`/events?category=${slug}`}>
        <div
          className={`kashi-card p-6 text-center cursor-pointer min-h-[180px] flex flex-col items-center justify-center gap-4`}
        >
          <motion.div
            className="text-5xl md:text-6xl"
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.6 }}
          >
            {icon}
          </motion.div>
          <h3 className="text-lg md:text-xl font-bold text-red-900">
            {name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
