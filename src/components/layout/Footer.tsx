'use client'

import React from 'react'
import { PersianButton } from '@/components/ui/PersianButton'

export function Footer() {
  return (
    <footer className="deep-footer text-yellow-100 mt-16 md:mt-24 py-12 md:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div>
            <h3 className="text-xl md:text-2xl font-black text-yellow-200 mb-4 md:mb-6">
              IranTour Guide
            </h3>
            <p className="text-sm md:text-base leading-relaxed">
              پلتفرم جامع رویدادهای فرهنگی، مذهبی، هنری و گردشگری ایران
            </p>
          </div>
          <div>
            <h4 className="font-black text-yellow-200 mb-4 md:mb-6 text-base md:text-lg">
              دسترسی سریع
            </h4>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              <li>
                <a href="#" className="hover:text-yellow-200 transition">
                  رویدادها
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-200 transition">
                  تقویم
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-200 transition">
                  نقشه
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-200 transition">
                  افزودن رویداد
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-yellow-200 mb-4 md:mb-6 text-base md:text-lg">
              درباره ما
            </h4>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              <li>
                <a href="#" className="hover:text-yellow-200 transition">
                  درباره ما
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-200 transition">
                  تماس با ما
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-200 transition">
                  قوانین و مقررات
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-200 transition">
                  حریم خصوصی
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-yellow-200 mb-4 md:mb-6 text-base md:text-lg">
              خبرنامه
            </h4>
            <p className="text-sm md:text-base mb-4">
              از آخرین رویدادها باخبر شوید
            </p>
            <div className="flex flex-col md:flex-row gap-2 md:gap-3">
              <input
                type="email"
                placeholder="ایمیل شما"
                className="flex-1 px-4 py-2.5 md:py-3 rounded-xl text-gray-800 font-bold outline-none text-sm md:text-base border-2 border-transparent focus:border-yellow-400 transition"
              />
              <PersianButton className="px-5 md:px-6 py-2.5 md:py-3 font-black text-sm md:text-base whitespace-nowrap">
                ثبت
              </PersianButton>
            </div>
          </div>
        </div>
        <div className="border-t border-yellow-400/30 mt-10 md:mt-12 pt-8 md:pt-10 text-center text-sm md:text-base">
          <p className="font-bold">
            © ۱۴۰۴ IranTour Guide - تمامی حقوق محفوظ است 🇮🇷
          </p>
        </div>
      </div>
    </footer>
  )
}
