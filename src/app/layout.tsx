import type { Metadata } from 'next'
import './globals.css'

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
        {children}
      </body>
    </html>
  )
}