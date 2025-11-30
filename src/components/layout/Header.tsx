'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
              <span className="text-2xl">🇮🇷</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-white">
                IranTour Guide
              </h1>
              <p className="text-xs text-blue-100 hidden md:block">
                راهنمای رویدادهای فرهنگی ایران
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8 items-center">
            <Link
              href="/"
              className={`text-white hover:text-blue-100 font-semibold transition-colors ${
                isActive('/') ? 'text-blue-100' : ''
              }`}
            >
              خانه
            </Link>
            <Link
              href="/events"
              className={`text-white hover:text-blue-100 font-semibold transition-colors ${
                isActive('/events') ? 'text-blue-100' : ''
              }`}
            >
              رویدادها
            </Link>
            <Link
              href="/calendar"
              className={`text-white hover:text-blue-100 font-semibold transition-colors ${
                isActive('/calendar') ? 'text-blue-100' : ''
              }`}
            >
              تقویم
            </Link>
            <Link
              href="/map"
              className={`text-white hover:text-blue-100 font-semibold transition-colors ${
                isActive('/map') ? 'text-blue-100' : ''
              }`}
            >
              نقشه
            </Link>
            <Link
              href="/ai-suggest"
              className={`text-white hover:text-blue-100 font-semibold transition-colors ${
                isActive('/ai-suggest') ? 'text-blue-100' : ''
              }`}
            >
              پیشنهاد هوشمند
            </Link>
            <Link href="/auth/signin">
              <button className="gradient-btn text-white px-6 py-2 rounded-lg font-bold">
                ورود / ثبت‌نام
              </button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden gradient-btn text-white px-4 py-2 rounded-lg font-bold"
          >
            ☰ منو
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 space-y-3">
            <Link
              href="/"
              className="block text-white hover:text-blue-100 font-semibold py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              خانه
            </Link>
            <Link
              href="/events"
              className="block text-white hover:text-blue-100 font-semibold py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              رویدادها
            </Link>
            <Link
              href="/calendar"
              className="block text-white hover:text-blue-100 font-semibold py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              تقویم
            </Link>
            <Link
              href="/map"
              className="block text-white hover:text-blue-100 font-semibold py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              نقشه
            </Link>
            <Link
              href="/ai-suggest"
              className="block text-white hover:text-blue-100 font-semibold py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              پیشنهاد هوشمند
            </Link>
            <Link href="/auth/signin">
              <button className="w-full gradient-btn text-white px-6 py-2 rounded-lg font-bold mt-2">
                ورود / ثبت‌نام
              </button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
