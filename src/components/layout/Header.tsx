import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="ml-4 flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl">IranTour Guide</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/events"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              رویدادها
            </Link>
            <Link
              href="/calendar"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              تقویم
            </Link>
            <Link
              href="/map"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              نقشه
            </Link>
            <Link
              href="/ai-suggest"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              پیشنهاد هوشمند
            </Link>
            <Link
              href="/submit-event"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              افزودن رویداد
            </Link>
            <Link
              href="/cultural-guide"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              دانشنامه فرهنگی
            </Link>
            <Link
              href="/blog"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              مجله
            </Link>
          </nav>
        </div>
        <div className="mr-auto flex items-center gap-4">
          <Button variant="ghost" size="sm">
            FA / EN
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/auth/signin">ورود</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/auth/signup">ثبت‌نام</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}