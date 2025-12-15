// src/lib/mock-data/cities-data.ts

export interface CityData {
  id: string
  name: string
  slug: string
  province: string
  description: string
  image: string
  population: string
  attractions: string[]
  bestTimeToVisit: string
  famousFor: string[]
  latitude: number
  longitude: number
}

export const citiesData: CityData[] = [
  {
    id: '1',
    name: 'تهران',
    slug: 'tehran',
    province: 'تهران',
    description:
      'تهران، پایتخت پرجمعیت ایران، شهری است مدرن و پویا که مرکز سیاسی، اقتصادی و فرهنگی کشور محسوب می‌شود. این شهر ترکیبی از معماری سنتی و مدرن را به نمایش می‌گذارد.',
    image: 'https://images.unsplash.com/photo-1602616622138-c1c2a4e05a5e?w=800&q=80',
    population: '9 میلیون نفر',
    attractions: ['کاخ گلستان', 'برج میلاد', 'موزه ملی ایران', 'بازار تهران', 'پارک ملت'],
    bestTimeToVisit: 'بهار و پاییز',
    famousFor: ['موزه‌ها', 'رستوران‌های متنوع', 'خرید', 'زندگی شبانه'],
    latitude: 35.6892,
    longitude: 51.389,
  },
  {
    id: '2',
    name: 'اصفهان',
    slug: 'isfahan',
    province: 'اصفهان',
    description:
      'اصفهان، نصف جهان، یکی از زیباترین شهرهای ایران است که با معماری صفوی و میدان نقش جهان شهرت جهانی دارد.',
    image: 'https://images.unsplash.com/photo-1567696153798-37c3dad9d3f6?w=800&q=80',
    population: '2 میلیون نفر',
    attractions: [
      'میدان نقش جهان',
      'مسجد شیخ لطف‌الله',
      'کاخ عالی‌قاپو',
      'پل سی‌وسه‌پل',
      'کاروانسرای عباسی',
    ],
    bestTimeToVisit: 'بهار',
    famousFor: ['معماری صفوی', 'صنایع دستی', 'گز و فریده'],
    latitude: 32.6546,
    longitude: 51.668,
  },
  {
    id: '3',
    name: 'شیراز',
    slug: 'shiraz',
    province: 'فارس',
    description:
      'شیراز، شهر عشق و شعر، با آرامگاه حافظ و سعدی و باغ‌های تاریخی، یکی از مقاصد اصلی گردشگری فرهنگی ایران است.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
    population: '1.9 میلیون نفر',
    attractions: ['حافظیه', 'سعدیه', 'باغ ارم', 'تخت جمشید', 'مسجد نصیرالملک'],
    bestTimeToVisit: 'بهار',
    famousFor: ['شعر و ادب', 'گل محمدی', 'شراب'],
    latitude: 29.5918,
    longitude: 52.5836,
  },
  {
    id: '4',
    name: 'مشهد',
    slug: 'mashhad',
    province: 'خراسان رضوی',
    description:
      'مشهد، دومین شهر پرجمعیت ایران و مهم‌ترین شهر مذهبی کشور، میزبان میلیون‌ها زائر از سراسر جهان است.',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
    population: '3.3 میلیون نفر',
    attractions: ['حرم امام رضا', 'موزه مرکزی', 'بازار رضا', 'پارک ملت', 'توس'],
    bestTimeToVisit: 'بهار و پاییز',
    famousFor: ['زیارت', 'سوغات', 'زعفران'],
    latitude: 36.2974,
    longitude: 59.6059,
  },
  {
    id: '5',
    name: 'یزد',
    slug: 'yazd',
    province: 'یزد',
    description:
      'یزد، شهر بادگیرها و شهر خشتی، با معماری کویری منحصربه‌فرد و بافت تاریخی زیبا، در میراث جهانی یونسکو ثبت شده است.',
    image: 'https://images.unsplash.com/photo-1578059760979-a1b5c1d69b1d?w=800&q=80',
    population: '530 هزار نفر',
    attractions: [
      'مسجد جامع یزد',
      'باغ دولت‌آباد',
      'برج‌های خاموشان',
      'میدان امیرچخماق',
      'آتشکده یزد',
    ],
    bestTimeToVisit: 'بهار و پاییز',
    famousFor: ['بادگیرها', 'شیرینی‌های سنتی', 'زرتشتیان'],
    latitude: 31.8974,
    longitude: 54.3569,
  },
  {
    id: '6',
    name: 'کاشان',
    slug: 'kashan',
    province: 'اصفهان',
    description:
      'کاشان، شهر گلاب و خانه‌های تاریخی، با معماری سنتی زیبا و جشنواره گلاب‌گیری، یکی از محبوب‌ترین مقاصد گردشگری است.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    population: '400 هزار نفر',
    attractions: ['خانه بروجردی‌ها', 'خانه طباطبایی‌ها', 'باغ فین', 'تپه سیلک', 'بازار کاشان'],
    bestTimeToVisit: 'اردیبهشت و خرداد (گلاب‌گیری)',
    famousFor: ['گلاب', 'خانه‌های تاریخی', 'صنایع دستی'],
    latitude: 33.9831,
    longitude: 51.4364,
  },
]
