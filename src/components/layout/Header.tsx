'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isEventsDropdownOpen, setIsEventsDropdownOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`glass-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl">🇮🇷</span>
            <span className="font-black text-xl gradient-text">IranTour Guide</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* Events Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center gap-1 text-sm font-semibold text-deep-red hover:text-gold transition-colors"
                onMouseEnter={() => setIsEventsDropdownOpen(true)}
                onMouseLeave={() => setIsEventsDropdownOpen(false)}
              >
                رویدادها
                <ChevronDown className="h-4 w-4" />
              </button>
              {isEventsDropdownOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border-2 border-gold py-2 z-50"
                  onMouseEnter={() => setIsEventsDropdownOpen(true)}
                  onMouseLeave={() => setIsEventsDropdownOpen(false)}
                >
                  <Link
                    href="/events"
                    className="block px-4 py-2 text-sm hover:bg-light-gold transition-colors"
                  >
                    همه رویدادها
                  </Link>
                  <Link
                    href="/events?type=RELIGIOUS"
                    className="block px-4 py-2 text-sm hover:bg-light-gold transition-colors"
                  >
                    مذهبی
                  </Link>
                  <Link
                    href="/events?type=ARTISTIC"
                    className="block px-4 py-2 text-sm hover:bg-light-gold transition-colors"
                  >
                    هنری
                  </Link>
                  <Link
                    href="/events?type=TOURISM"
                    className="block px-4 py-2 text-sm hover:bg-light-gold transition-colors"
                  >
                    گردشگری
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/calendar"
              className="text-sm font-semibold text-deep-red hover:text-gold transition-colors"
            >
              تقویم
            </Link>

            <Link
              href="/map"
              className="text-sm font-semibold text-deep-red hover:text-gold transition-colors"
            >
              نقشه
            </Link>

            <Link
              href="/ai-suggest"
              className="text-sm font-semibold text-deep-red hover:text-gold transition-colors"
            >
              پیشنهاد هوشمند
            </Link>

            <Link
              href="/submit-event"
              className="text-sm font-semibold text-persian-red hover:text-gold transition-colors"
            >
              افزودن رویداد
            </Link>

            <Link
              href="/cultural-guide"
              className="text-sm font-semibold text-deep-red hover:text-gold transition-colors"
            >
              دانشنامه فرهنگی
            </Link>

            <Link
              href="/blog"
              className="text-sm font-semibold text-deep-red hover:text-gold transition-colors"
            >
              مجله
            </Link>

            <Link
              href="/about"
              className="text-sm font-semibold text-deep-red hover:text-gold transition-colors"
            >
              درباره ما
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-bold hover:bg-light-gold"
            >
              FA / EN
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-gold text-deep-red hover:bg-light-gold font-bold"
            >
              <Link href="/auth/signin">ورود</Link>
            </Button>
            <button className="deep-persian-btn text-sm px-4 py-2">
              <Link href="/auth/signup">ثبت‌نام</Link>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-deep-red"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gold/20 mt-2">
            <nav className="flex flex-col gap-3">
              <Link
                href="/events"
                className="px-4 py-2 text-sm font-semibold text-deep-red hover:bg-light-gold rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                رویدادها
              </Link>
              <Link
                href="/calendar"
                className="px-4 py-2 text-sm font-semibold text-deep-red hover:bg-light-gold rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                تقویم
              </Link>
              <Link
                href="/map"
                className="px-4 py-2 text-sm font-semibold text-deep-red hover:bg-light-gold rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                نقشه
              </Link>
              <Link
                href="/ai-suggest"
                className="px-4 py-2 text-sm font-semibold text-deep-red hover:bg-light-gold rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                پیشنهاد هوشمند
              </Link>
              <Link
                href="/submit-event"
                className="px-4 py-2 text-sm font-bold text-persian-red hover:bg-light-gold rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                افزودن رویداد
              </Link>
              <Link
                href="/cultural-guide"
                className="px-4 py-2 text-sm font-semibold text-deep-red hover:bg-light-gold rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                دانشنامه فرهنگی
              </Link>
              <Link
                href="/blog"
                className="px-4 py-2 text-sm font-semibold text-deep-red hover:bg-light-gold rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                مجله
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 text-sm font-semibold text-deep-red hover:bg-light-gold rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                درباره ما
              </Link>

              <div className="border-t border-gold/20 mt-2 pt-3 px-4 flex flex-col gap-2">
                <Button variant="ghost" size="sm" className="w-full justify-center font-bold">
                  FA / EN
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="w-full border-gold text-deep-red font-bold"
                >
                  <Link href="/auth/signin" onClick={() => setIsMobileMenuOpen(false)}>
                    ورود
                  </Link>
                </Button>
                <button className="deep-persian-btn w-full">
                  <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    ثبت‌نام
                  </Link>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
