export const siteConfig = {
  name: "IranTour-Guide",
  nameFa: "راهنمای رویدادهای ایران",
  description: "پلتفرم جامع رویدادهای فرهنگی، مذهبی، هنری و گردشگری ایران",
  descriptionFa: "کشف و تجربه بهترین رویدادهای فرهنگی، مذهبی، هنری و گردشگری ایران با پیشنهادات هوشمند",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://irantour-guide.ir",
  ogImage: "/images/og-image.jpg",
  links: {
    instagram: "https://instagram.com/irantourguide",
    telegram: "https://t.me/irantourguide",
    twitter: "https://twitter.com/irantourguide",
    email: "info@irantourguide.ir",
    phone: "+98-21-12345678",
  },
  contact: {
    emailFa: "info@irantourguide.ir",
    phoneFa: "۰۲۱-۱۲۳۴۵۶۷۸",
    address: "تهران، ایران",
  },
  features: {
    aiSuggestions: true,
    eventSubmission: true,
    culturalWiki: true,
    eventMap: true,
    eventCalendar: true,
    magazine: true,
  },
  stats: {
    totalEvents: "۵۰۰+",
    totalCities: "۳۱",
    totalCategories: "۱۲",
    monthlyVisitors: "۱۰۰K+",
  },
} as const;
