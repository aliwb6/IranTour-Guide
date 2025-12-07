// src/components/layout/Header.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-gold shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* لوگو */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-4xl">🏛️</span>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-red-900 group-hover:text-red-700 transition">
                IranTour Guide
              </span>
              <span className="text-sm font-bold text-gray-600">
                راهنمای رویدادهای ایران
              </span>
            </div>
          </Link>

          {/* منوی دسکتاپ */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className="font-black text-gray-700 hover:text-red-900 transition"
            >
              خانه
            </Link>
            <Link
              href="/events"
              className="font-black text-gray-700 hover:text-red-900 transition"
            >
              🎭 رویدادها
            </Link>
            <Link
              href="/calendar"
              className="font-black text-gray-700 hover:text-red-900 transition"
            >
              📅 تقویم
            </Link>
            <Link
              href="/map"
              className="font-black text-gray-700 hover:text-red-900 transition"
            >
              🗺️ نقشه
            </Link>
            <Link
              href="/cities"
              className="font-black text-gray-700 hover:text-red-900 transition"
            >
              🏙️ شهرها
            </Link>
            <Link
              href="/blog"
              className="font-black text-gray-700 hover:text-red-900 transition"
            >
              📰 مجله
            </Link>
            <Link
              href="/about"
              className="font-black text-gray-700 hover:text-red-900 transition"
            >
              درباره ما
            </Link>
          </div>

          {/* دکمه CTA */}
          <div className="hidden lg:block">
            <Link href="/submit-event" className="deep-persian-btn px-6 py-3 font-black">
              ➕ افزودن رویداد
            </Link>
          </div>

          {/* دکمه منوی موبایل */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-red-900 text-2xl font-black"
          >
            ☰
          </button>
        </div>

        {/* منوی موبایل */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t-2 border-gold space-y-3">
            <Link
              href="/"
              className="block font-black text-gray-700 hover:text-red-900 transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              خانه
            </Link>
            <Link
              href="/events"
              className="block font-black text-gray-700 hover:text-red-900 transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              🎭 رویدادها
            </Link>
            <Link
              href="/calendar"
              className="block font-black text-gray-700 hover:text-red-900 transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              📅 تقویم
            </Link>
            <Link
              href="/map"
              className="block font-black text-gray-700 hover:text-red-900 transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              🗺️ نقشه
            </Link>
            <Link
              href="/cities"
              className="block font-black text-gray-700 hover:text-red-900 transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              🏙️ شهرها
            </Link>
            <Link
              href="/blog"
              className="block font-black text-gray-700 hover:text-red-900 transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              📰 مجله
            </Link>
            <Link
              href="/about"
              className="block font-black text-gray-700 hover:text-red-900 transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              درباره ما
            </Link>
            <Link
              href="/submit-event"
              className="block deep-persian-btn px-6 py-3 font-black text-center mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              ➕ افزودن رویداد
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
