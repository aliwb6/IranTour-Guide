export const siteConfig = {
  name: 'IranTour Guide',
  description:
    'کشف و تجربه بهترین رویدادهای فرهنگی، مذهبی، هنری و گردشگری ایران با پیشنهادات هوشمند',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/irantourguide',
    instagram: 'https://instagram.com/irantourguide',
    telegram: 'https://t.me/irantourguide',
  },
  author: 'IranTour Guide Team',
  keywords: [
    'رویدادهای ایران',
    'گردشگری ایران',
    'جشنواره های ایران',
    'مناسبت های مذهبی',
    'نوروز',
    'یلدا',
    'Iran events',
    'Iran tourism',
    'Persian festivals',
    'Iranian culture',
  ],
}

export type SiteConfig = typeof siteConfig