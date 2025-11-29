'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="kashi-star-pattern shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 relative z-10">
        <div className="flex justify-between items-center flex-wrap gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
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
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-6 items-center">
            <Link
              href="/"
              className={`text-yellow-100 hover:text-yellow-300 font-bold transition text-sm ${
                isActive('/') ? 'text-yellow-300' : ''
              }`}
            >
              خانه
            </Link>
            <Link
              href="/events"
              className={`text-yellow-100 hover:text-yellow-300 font-bold transition text-sm ${
                isActive('/events') ? 'text-yellow-300' : ''
              }`}
            >
              رویدادها
            </Link>
            <Link
              href="/calendar"
              className={`text-yellow-100 hover:text-yellow-300 font-bold transition text-sm ${
                isActive('/calendar') ? 'text-yellow-300' : ''
              }`}
            >
              تقویم
            </Link>
            <Link
              href="/map"
              className={`text-yellow-100 hover:text-yellow-300 font-bold transition text-sm ${
                isActive('/map') ? 'text-yellow-300' : ''
              }`}
            >
              نقشه
            </Link>
            <Link
              href="/ai-suggest"
              className={`text-yellow-100 hover:text-yellow-300 font-bold transition text-sm ${
                isActive('/ai-suggest') ? 'text-yellow-300' : ''
              }`}
            >
              پیشنهاد هوشمند
            </Link>
            <Link href="/auth/signin">
              <button className="deep-persian-btn px-6 py-2.5 text-sm">
                ورود / ثبت‌نام
              </button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden deep-persian-btn px-4 py-2 text-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? '✕' : '☰'} منو
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 flex flex-col gap-3 pb-4">
            <Link
              href="/"
              className="text-yellow-100 hover:text-yellow-300 font-bold transition text-sm py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              خانه
            </Link>
            <Link
              href="/events"
              className="text-yellow-100 hover:text-yellow-300 font-bold transition text-sm py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              رویدادها
            </Link>
            <Link
              href="/calendar"
              className="text-yellow-100 hover:text-yellow-300 font-bold transition text-sm py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              تقویم
            </Link>
            <Link
              href="/map"
              className="text-yellow-100 hover:text-yellow-300 font-bold transition text-sm py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              نقشه
            </Link>
            <Link
              href="/ai-suggest"
              className="text-yellow-100 hover:text-yellow-300 font-bold transition text-sm py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              پیشنهاد هوشمند
            </Link>
            <Link href="/auth/signin" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="deep-persian-btn px-6 py-2.5 text-sm w-full">
                ورود / ثبت‌نام
              </button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
