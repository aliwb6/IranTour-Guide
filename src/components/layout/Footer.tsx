'use client'

import Link from 'next/link'
import { Instagram, Send, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const jalaliYear = currentYear - 621 // تبدیل تقریبی به سال شمسی

  return (
    <footer className="deep-footer py-12 relative z-10">
      <div className="container mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-black mb-4 flex items-center gap-2">
              <span className="text-2xl">🇮🇷</span>
              IranTour Guide
            </h3>
            <p className="text-sm leading-relaxed opacity-90 mb-4">
              پلتفرم جامع رویدادهای فرهنگی، مذهبی، هنری و گردشگری ایران.
              کشف و تجربه فرهنگ غنی و متنوع ایران زمین.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/irantourguide"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-light-gold/20 hover:bg-gold flex items-center justify-center transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://t.me/irantourguide"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-light-gold/20 hover:bg-gold flex items-center justify-center transition-all hover:scale-110"
                aria-label="Telegram"
              >
                <Send className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@irantourguide.com"
                className="w-10 h-10 rounded-full bg-light-gold/20 hover:bg-gold flex items-center justify-center transition-all hover:scale-110"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">دسترسی سریع</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/events" className="hover:mr-2 transition-all inline-block">
                  ← رویدادها
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:mr-2 transition-all inline-block">
                  ← تقویم رویدادها
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:mr-2 transition-all inline-block">
                  ← نقشه ایران
                </Link>
              </li>
              <li>
                <Link href="/ai-suggest" className="hover:mr-2 transition-all inline-block">
                  ← پیشنهاد هوشمند
                </Link>
              </li>
              <li>
                <Link href="/submit-event" className="hover:mr-2 transition-all inline-block font-bold">
                  ← افزودن رویداد
                </Link>
              </li>
              <li>
                <Link href="/cities" className="hover:mr-2 transition-all inline-block">
                  ← شهرهای ایران
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: About Us */}
          <div>
            <h3 className="text-lg font-bold mb-4">درباره ما</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:mr-2 transition-all inline-block">
                  ← درباره IranTour Guide
                </Link>
              </li>
              <li>
                <Link href="/cultural-guide" className="hover:mr-2 transition-all inline-block">
                  ← دانشنامه فرهنگی
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:mr-2 transition-all inline-block">
                  ← مجله گردشگری
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:mr-2 transition-all inline-block">
                  ← تماس با ما
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:mr-2 transition-all inline-block">
                  ← سوالات متداول
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:mr-2 transition-all inline-block">
                  ← قوانین و مقررات
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">خبرنامه</h3>
            <p className="text-sm mb-4 opacity-90">
              از آخرین رویدادها و جشنواره‌های ایران باخبر شوید
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="ایمیل شما"
                className="px-4 py-2 rounded-lg bg-white/10 border-2 border-gold/30 text-white placeholder:text-light-gold/70 focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="deep-persian-btn w-full text-sm"
              >
                ثبت در خبرنامه
              </button>
            </form>
            <p className="text-xs mt-3 opacity-75">
              با ثبت‌نام، شما <Link href="/privacy" className="underline">قوانین حریم خصوصی</Link> را می‌پذیرید.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gold/20 mb-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="text-center md:text-right">
            <p className="opacity-90">
              © {jalaliYear} (۱۴۰۴) IranTour Guide | تمامی حقوق محفوظ است
            </p>
          </div>
          <div className="flex gap-4 text-xs opacity-80">
            <Link href="/privacy" className="hover:opacity-100 transition-opacity">
              حریم خصوصی
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:opacity-100 transition-opacity">
              قوانین استفاده
            </Link>
            <span>•</span>
            <Link href="/sitemap" className="hover:opacity-100 transition-opacity">
              نقشه سایت
            </Link>
          </div>
        </div>

        {/* Made with Love */}
        <div className="text-center mt-6 text-xs opacity-70">
          <p>ساخته شده با ❤️ برای ایران</p>
        </div>
      </div>
    </footer>
  )
}
