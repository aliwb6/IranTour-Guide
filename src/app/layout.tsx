import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'

// فونت Vazirmatn
const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-vazirmatn',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'IranTour Guide | راهنمای رویدادهای ایران',
  description:
    'کشف و تجربه بهترین رویدادهای فرهنگی، مذهبی، هنری و گردشگری ایران',
  keywords: [
    'رویدادهای ایران',
    'گردشگری ایران',
    'جشنواره‌های ایران',
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
      <body className={`${vazirmatn.variable} font-sans antialiased bg-gray-50`}>
        {children}
      </body>
    </html>
  )
}
