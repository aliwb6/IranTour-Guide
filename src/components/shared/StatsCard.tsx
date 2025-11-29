'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StatsCardProps {
  number: string;
  label: string;
  delay?: number;
}

export function StatsCard({ number, label, delay = 0 }: StatsCardProps) {
  const [count, setCount] = useState(0);

  // استخراج عدد از رشته (مثلاً "۵۰۰+" به ۵۰۰)
  const extractNumber = (str: string): number => {
    const match = str.match(/[\d۰-۹]+/);
    if (!match) return 0;

    // تبدیل اعداد فارسی به انگلیسی
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumber = match[0].replace(/[۰-۹]/g, (d) => persianDigits.indexOf(d).toString());

    return parseInt(englishNumber) || 0;
  };

  const targetNumber = extractNumber(number);
  const suffix = number.replace(/[\d۰-۹]+/, '');

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / 2000, 1); // 2 seconds duration

      const currentCount = Math.floor(progress * targetNumber);
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(targetNumber);
      }
    };

    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [targetNumber, delay]);

  // تبدیل عدد به فارسی
  const toPersianNumber = (num: number): string => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, (d) => persianDigits[parseInt(d)]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="tile-stats text-center"
    >
      <motion.div
        className="text-3xl md:text-4xl font-black text-red-900 mb-2"
        initial={{ scale: 0.5 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.2, type: 'spring' }}
      >
        {toPersianNumber(count)}{suffix}
      </motion.div>
      <div className="text-sm md:text-base text-red-800 font-semibold">
        {label}
      </div>
    </motion.div>
  );
}
