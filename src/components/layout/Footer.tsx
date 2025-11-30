import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">درباره ما</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              پلتفرم جامع رویدادهای فرهنگی، مذهبی، علمی، هنری و گردشگری ایران
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">دسترسی سریع</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors">
                  رویدادها
                </Link>
              </li>
              <li>
                <Link href="/cities" className="text-muted-foreground hover:text-foreground transition-colors">
                  شهرها
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="text-muted-foreground hover:text-foreground transition-colors">
                  تقویم
                </Link>
              </li>
              <li>
                <Link href="/submit-event" className="text-muted-foreground hover:text-foreground transition-colors">
                  افزودن رویداد
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">منابع</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/cultural-guide" className="text-muted-foreground hover:text-foreground transition-colors">
                  دانشنامه فرهنگی
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  مجله
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-lg mb-4">شبکه‌های اجتماعی</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/irantourguide"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                اینستاگرام
              </a>
              <a
                href="https://t.me/irantourguide"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                تلگرام
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} IranTour Guide. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  )
}