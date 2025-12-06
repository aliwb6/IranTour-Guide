'use client'

import React, { useState } from 'react'
import { PersianButton } from '@/components/ui/PersianButton'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="kashi-star-pattern shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 relative z-10">
        <div className="flex justify-between items-center flex-wrap gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg border-2 border-yellow-200 glow">
              <span className="text-3xl md:text-4xl">🇮🇷</span>
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-black text-yellow-200 drop-shadow-lg">
                IranTour Guide
              </h1>
              <p className="text-xs md:text-sm text-yellow-100/90">
                راهنمای جامع رویدادهای فرهنگی ایران
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex gap-6 items-center">
            <a
              href="#"
              className="text-yellow-100 hover:text-yellow-300 font-bold transition text-sm"
            >
              خانه
            </a>
            <a
              href="#events"
              className="text-yellow-100 hover:text-yellow-300 font-bold transition text-sm"
            >
              رویدادها
            </a>
            <a
              href="#"
              className="text-yellow-100 hover:text-yellow-300 font-bold transition text-sm"
            >
              تقویم
            </a>
            <a
              href="#"
              className="text-yellow-100 hover:text-yellow-300 font-bold transition text-sm"
            >
              نقشه
            </a>
            <a
              href="#"
              className="text-yellow-100 hover:text-yellow-300 font-bold transition text-sm"
            >
              پیشنهاد هوشمند
            </a>
            <PersianButton className="px-6 py-2.5 text-sm">
              ورود / ثبت‌نام
            </PersianButton>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="lg:hidden deep-persian-btn px-4 py-2 text-sm"
          >
            ☰ منو
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 flex flex-col gap-3 bg-deep-red/90 p-4 rounded-xl">
            <a
              href="#"
              className="text-yellow-100 hover:text-yellow-300 font-bold transition text-sm py-2"
            >
              خانه
            </a>
            <a
              href="#events"
              className="text-yellow-100 hover:text-yellow-300 font-bold transition text-sm py-2"
            >
              رویدادها
            </a>
            <a
              href="#"
              className="text-yellow-100 hover:text-yellow-300 font-bold transition text-sm py-2"
            >
              تقویم
            </a>
            <a
              href="#"
              className="text-yellow-100 hover:text-yellow-300 font-bold transition text-sm py-2"
            >
              نقشه
            </a>
            <a
              href="#"
              className="text-yellow-100 hover:text-yellow-300 font-bold transition text-sm py-2"
            >
              پیشنهاد هوشمند
            </a>
            <PersianButton className="px-6 py-2.5 text-sm w-full">
              ورود / ثبت‌نام
            </PersianButton>
          </div>
        )}
      </div>
    </header>
  )
}
