import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="deep-footer text-yellow-200 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* درباره */}
          <div>
            <h3 className="text-xl font-black mb-4 flex items-center gap-2">
              🏛️ IranTour Guide
            </h3>
            <p className="text-yellow-100/90 font-bold leading-relaxed">
              راهنمای جامع رویدادهای فرهنگی، مذهبی، هنری و گردشگری ایران
            </p>
          </div>

          {/* لینک‌های سریع */}
          <div>
            <h3 className="text-lg font-black mb-4 text-gold">دسترسی سریع</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/events" className="text-yellow-100/90 hover:text-gold transition font-bold">
                  🎭 رویدادها
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="text-yellow-100/90 hover:text-gold transition font-bold">
                  📅 تقویم
                </Link>
              </li>
              <li>
                <Link href="/cities" className="text-yellow-100/90 hover:text-gold transition font-bold">
                  🏙️ شهرها
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-yellow-100/90 hover:text-gold transition font-bold">
                  📰 مجله
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-yellow-100/90 hover:text-gold transition font-bold">
                  🗺️ نقشه
                </Link>
              </li>
            </ul>
          </div>

          {/* موضوعات محبوب */}
          <div>
            <h3 className="text-lg font-black mb-4 text-gold">موضوعات محبوب</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/events?type=ملی" className="text-yellow-100/90 hover:text-gold transition font-bold">
                  رویدادهای ملی
                </Link>
              </li>
              <li>
                <Link href="/events?type=مذهبی" className="text-yellow-100/90 hover:text-gold transition font-bold">
                  مذهبی
                </Link>
              </li>
              <li>
                <Link href="/events?type=هنری" className="text-yellow-100/90 hover:text-gold transition font-bold">
                  هنری
                </Link>
              </li>
              <li>
                <Link href="/events?type=گردشگری" className="text-yellow-100/90 hover:text-gold transition font-bold">
                  گردشگری
                </Link>
              </li>
              <li>
                <Link href="/events?type=فرهنگی" className="text-yellow-100/90 hover:text-gold transition font-bold">
                  فرهنگی
                </Link>
              </li>
            </ul>
          </div>

          {/* تماس */}
          <div>
            <h3 className="text-lg font-black mb-4 text-gold">تماس با ما</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@irantour-guide.com" className="text-yellow-100/90 hover:text-gold transition font-bold">
                  📧 info@irantour-guide.com
                </a>
              </li>
              <li>
                <Link href="/about" className="text-yellow-100/90 hover:text-gold transition font-bold">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-yellow-100/90 hover:text-gold transition font-bold">
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link href="/ai-suggest" className="text-yellow-100/90 hover:text-gold transition font-bold">
                  🤖 پیشنهاد هوشمند
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* کپی‌رایت */}
        <div className="border-t-2 border-gold/40 mt-10 pt-8 text-center">
          <p className="text-yellow-100/80 font-bold">
            © {new Date().getFullYear()} IranTour Guide. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  )
}
