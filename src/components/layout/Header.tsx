// src/components/layout/Header.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, LogOut, Settings, Bookmark, ChevronDown } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  const user = session?.user

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
              <span className="text-sm font-bold text-gray-600">راهنمای رویدادهای ایران</span>
            </div>
          </Link>

          {/* منوی دسکتاپ */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/" className="font-black text-gray-700 hover:text-red-900 transition">
              خانه
            </Link>
            <Link href="/events" className="font-black text-gray-700 hover:text-red-900 transition">
              🎭 رویدادها
            </Link>
            <Link
              href="/calendar"
              className="font-black text-gray-700 hover:text-red-900 transition"
            >
              📅 تقویم
            </Link>
            <Link href="/map" className="font-black text-gray-700 hover:text-red-900 transition">
              🗺️ نقشه
            </Link>
            <Link href="/cities" className="font-black text-gray-700 hover:text-red-900 transition">
              🏙️ شهرها
            </Link>
            <Link href="/blog" className="font-black text-gray-700 hover:text-red-900 transition">
              📰 مجله
            </Link>
            <Link href="/about" className="font-black text-gray-700 hover:text-red-900 transition">
              درباره ما
            </Link>
          </div>

          {/* Authentication UI */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/submit-event" className="deep-persian-btn px-6 py-3 font-black">
              ➕ افزودن رویداد
            </Link>

            {user ? (
              // Authenticated User Dropdown
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-gray-300 hover:border-gold transition-colors"
                >
                  {/* User Avatar/Initial */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-black">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name || ''}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      user.name?.charAt(0) || 'U'
                    )}
                  </div>
                  <span className="font-bold text-gray-700">{user.name}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                  />
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border-2 border-gray-200 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b-2 border-gray-100 bg-gradient-to-br from-purple-50 to-blue-50">
                        <p className="font-black text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600 font-medium">{user.email}</p>
                      </div>

                      <div className="py-2">
                        <Link
                          href="/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <User className="w-5 h-5 text-gray-600" />
                          <span className="font-bold text-gray-700">پروفایل من</span>
                        </Link>

                        <Link
                          href="/profile/saved"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <Bookmark className="w-5 h-5 text-gray-600" />
                          <span className="font-bold text-gray-700">رویدادهای ذخیره‌شده</span>
                        </Link>

                        <Link
                          href="/profile/settings"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <Settings className="w-5 h-5 text-gray-600" />
                          <span className="font-bold text-gray-700">تنظیمات</span>
                        </Link>

                        <button
                          onClick={() => {
                            setUserMenuOpen(false)
                            signOut({ callbackUrl: '/' })
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors border-t-2 border-gray-100"
                        >
                          <LogOut className="w-5 h-5 text-red-600" />
                          <span className="font-bold text-red-600">خروج</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // Guest User - Login/Signup Buttons
              <div className="flex items-center gap-3">
                <Link href="/auth/signin">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:border-gold hover:text-gold transition-colors"
                  >
                    ورود
                  </motion.button>
                </Link>

                <Link href="/auth/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:shadow-lg transition-shadow"
                  >
                    ثبت‌نام
                  </motion.button>
                </Link>
              </div>
            )}
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

            {/* Mobile Authentication */}
            {user ? (
              <div className="mt-6 pt-6 border-t-2 border-gray-200 space-y-3">
                <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-black">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name || ''}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      user.name?.charAt(0) || 'U'
                    )}
                  </div>
                  <div>
                    <p className="font-black text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-600 font-medium">{user.email}</p>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="font-bold text-gray-700">پروفایل من</span>
                </Link>

                <Link
                  href="/profile/saved"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <Bookmark className="w-5 h-5 text-gray-600" />
                  <span className="font-bold text-gray-700">رویدادهای ذخیره‌شده</span>
                </Link>

                <Link
                  href="/profile/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="font-bold text-gray-700">تنظیمات</span>
                </Link>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    signOut({ callbackUrl: '/' })
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-5 h-5 text-red-600" />
                  <span className="font-bold text-red-600">خروج</span>
                </button>
              </div>
            ) : (
              <div className="mt-6 pt-6 border-t-2 border-gray-200 space-y-3">
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-bold text-center hover:border-gold transition-colors"
                >
                  ورود
                </Link>

                <Link
                  href="/auth/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-center"
                >
                  ثبت‌نام
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
