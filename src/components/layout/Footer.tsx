'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`ایمیل ${email} با موفقیت ثبت شد!`);
    setEmail('');
  };

  return (
    <footer className="deep-footer mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-black text-yellow-200 mb-4">
              IranTour Guide
            </h3>
            <p className="text-yellow-100/80 text-sm leading-relaxed">
              پلتفرم جامع رویدادهای فرهنگی، مذهبی، هنری و گردشگری ایران
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-black text-yellow-200 mb-4">
              دسترسی سریع
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/events"
                  className="text-yellow-100/80 hover:text-yellow-200 transition"
                >
                  رویدادها
                </Link>
              </li>
              <li>
                <Link
                  href="/calendar"
                  className="text-yellow-100/80 hover:text-yellow-200 transition"
                >
                  تقویم
                </Link>
              </li>
              <li>
                <Link
                  href="/map"
                  className="text-yellow-100/80 hover:text-yellow-200 transition"
                >
                  نقشه
                </Link>
              </li>
              <li>
                <Link
                  href="/submit-event"
                  className="text-yellow-100/80 hover:text-yellow-200 transition"
                >
                  افزودن رویداد
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xl font-black text-yellow-200 mb-4">
              درباره ما
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-yellow-100/80 hover:text-yellow-200 transition"
                >
                  درباره ما
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-yellow-100/80 hover:text-yellow-200 transition"
                >
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-yellow-100/80 hover:text-yellow-200 transition"
                >
                  قوانین و مقررات
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-yellow-100/80 hover:text-yellow-200 transition"
                >
                  حریم خصوصی
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-black text-yellow-200 mb-4">
              خبرنامه
            </h3>
            <p className="text-yellow-100/80 text-sm mb-4">
              از آخرین رویدادها باخبر شوید
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="ایمیل شما"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-2 rounded-lg bg-yellow-100/10 border-2 border-yellow-200/30 text-yellow-100 placeholder-yellow-100/50 text-sm focus:outline-none focus:border-yellow-200"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-200 hover:bg-yellow-300 text-red-900 font-bold rounded-lg transition text-sm"
              >
                ثبت
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent my-8"></div>

        {/* Copyright */}
        <div className="text-center text-yellow-100/60 text-sm">
          <p>
            © {currentYear} IranTour Guide. تمامی حقوق محفوظ است.
          </p>
          <p className="mt-2 text-xs">
            ساخته شده با ❤️ برای فرهنگ و هنر ایران
          </p>
        </div>
      </div>
    </footer>
  );
}
