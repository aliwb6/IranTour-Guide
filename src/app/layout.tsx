import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'IranTour Guide | راهنمای رویدادهای فرهنگی و گردشگری ایران',
  description:
    'کشف و تجربه بهترین رویدادهای فرهنگی، مذهبی، هنری و گردشگری ایران با پیشنهادات هوشمند. پلتفرم جامع برای یافتن و ثبت رویدادهای ملی، مذهبی، هنری و گردشگری سراسر کشور.',
  keywords: [
    'رویدادهای ایران',
    'گردشگری ایران',
    'جشنواره های ایران',
    'مناسبت های مذهبی',
    'نوروز',
    'یلدا',
    'محرم',
    'چهارشنبه سوری',
    'سیزده بدر',
    'Iran events',
    'Iran tourism',
    'Persian festivals',
  ],
  authors: [{ name: 'IranTour Guide Team' }],
  creator: 'IranTour Guide',
  publisher: 'IranTour Guide',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: 'https://irantourguide.com',
    title: 'IranTour Guide | راهنمای رویدادهای فرهنگی و گردشگری ایران',
    description: 'کشف و تجربه فرهنگ، هنر و جشن‌های ایران',
    siteName: 'IranTour Guide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IranTour Guide | راهنمای رویدادهای ایران',
    description: 'کشف و تجربه فرهنگ، هنر و جشن‌های ایران',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body className="font-sans antialiased" style={{ fontFamily: 'Vazirmatn, Tahoma, Arial, sans-serif' }}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}