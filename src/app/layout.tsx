import type { Metadata } from 'next'
// Font is imported in globals.css to avoid network issues during build
// import { Vazirmatn } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './globals.css'

// const vazirmatn = Vazirmatn({
//   subsets: ['arabic'],
//   variable: '--font-vazirmatn',
// })

export const metadata: Metadata = {
  title: 'IranTour Guide | راهنمای رویدادهای فرهنگی و گردشگری ایران',
  description:
    'کشف و تجربه بهترین رویدادهای فرهنگی، مذهبی، هنری و گردشگری ایران با پیشنهادات هوشمند',
  keywords: [
    'رویدادهای ایران',
    'گردشگری ایران',
    'جشنواره های ایران',
    'مناسبت های مذهبی',
    'نوروز',
    'یلدا',
    'Iran events',
    'Iran tourism',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
