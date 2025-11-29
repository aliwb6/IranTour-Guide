import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="deep-footer mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-black text-yellow-200 mb-4">
              درباره IranTour Guide
            </h3>
            <p className="text-yellow-100/80 text-sm leading-relaxed">
              راهنمای جامع رویدادهای فرهنگی، مذهبی، هنری و گردشگری سراسر ایران.
              کشف، تجربه و اشتراک‌گذاری بهترین رویدادها با پیشنهادات هوشمند.
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
                  تقویم رویدادها
                </Link>
              </li>
              <li>
                <Link
                  href="/map"
                  className="text-yellow-100/80 hover:text-yellow-200 transition"
                >
                  نقشه رویدادها
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-suggest"
                  className="text-yellow-100/80 hover:text-yellow-200 transition"
                >
                  پیشنهاد هوشمند
                </Link>
              </li>
              <li>
                <Link
                  href="/submit-event"
                  className="text-yellow-100/80 hover:text-yellow-200 transition"
                >
                  ثبت رویداد
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-black text-yellow-200 mb-4">
              دسته‌بندی‌ها
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="text-yellow-100/80">🎭 جشنواره‌ها</li>
              <li className="text-yellow-100/80">🎨 نمایشگاه‌ها</li>
              <li className="text-yellow-100/80">🕌 مناسبت‌های مذهبی</li>
              <li className="text-yellow-100/80">🎤 همایش‌ها</li>
              <li className="text-yellow-100/80">🏛️ رویدادهای فرهنگی</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-black text-yellow-200 mb-4">
              تماس با ما
            </h3>
            <ul className="space-y-2 text-sm text-yellow-100/80">
              <li>📧 info@irantourguide.ir</li>
              <li>📱 ۰۲۱-۱۲۳۴۵۶۷۸</li>
              <li className="pt-3 flex gap-3">
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg bg-yellow-200/10 hover:bg-yellow-200/20 transition flex items-center justify-center"
                  aria-label="Instagram"
                >
                  📷
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg bg-yellow-200/10 hover:bg-yellow-200/20 transition flex items-center justify-center"
                  aria-label="Telegram"
                >
                  ✈️
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-lg bg-yellow-200/10 hover:bg-yellow-200/20 transition flex items-center justify-center"
                  aria-label="Twitter"
                >
                  🐦
                </a>
              </li>
            </ul>
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
