// src/config/cities.ts
// داده‌های شهرهای اصلی ایران

export interface CityData {
  name: string
  nameEn: string
  slug: string
  province: string
  description: string
  latitude: number
  longitude: number
  image?: string
}

export const CITIES: CityData[] = [
  {
    name: 'تهران',
    nameEn: 'Tehran',
    slug: 'tehran',
    province: 'تهران',
    description: 'پایتخت و بزرگترین شهر ایران',
    latitude: 35.6892,
    longitude: 51.389,
  },
  {
    name: 'اصفهان',
    nameEn: 'Isfahan',
    slug: 'isfahan',
    province: 'اصفهان',
    description: 'نصف جهان - شهر تاریخی و فرهنگی ایران',
    latitude: 32.6546,
    longitude: 51.668,
  },
  {
    name: 'شیراز',
    nameEn: 'Shiraz',
    slug: 'shiraz',
    province: 'فارس',
    description: 'شهر شعر، ادب و باغ‌های زیبا',
    latitude: 29.5918,
    longitude: 52.5836,
  },
  {
    name: 'مشهد',
    nameEn: 'Mashhad',
    slug: 'mashhad',
    province: 'خراسان رضوی',
    description: 'دومین شهر بزرگ ایران و مرکز زیارتی',
    latitude: 36.2974,
    longitude: 59.6067,
  },
  {
    name: 'یزد',
    nameEn: 'Yazd',
    slug: 'yazd',
    province: 'یزد',
    description: 'شهر بادگیرها و کویر',
    latitude: 31.8974,
    longitude: 54.3569,
  },
  {
    name: 'تبریز',
    nameEn: 'Tabriz',
    slug: 'tabriz',
    province: 'آذربایجان شرقی',
    description: 'شهر تاریخی و مرکز تجاری شمال غرب ایران',
    latitude: 38.0962,
    longitude: 46.2738,
  },
  {
    name: 'کرمان',
    nameEn: 'Kerman',
    slug: 'kerman',
    province: 'کرمان',
    description: 'شهر تاریخی با فرهنگ غنی',
    latitude: 30.2832,
    longitude: 57.0788,
  },
  {
    name: 'قزوین',
    nameEn: 'Qazvin',
    slug: 'qazvin',
    province: 'قزوین',
    description: 'یکی از شهرهای تاریخی ایران',
    latitude: 36.2688,
    longitude: 50.0041,
  },
  {
    name: 'کیش',
    nameEn: 'Kish',
    slug: 'kish',
    province: 'هرمزگان',
    description: 'جزیره گردشگری خلیج فارس',
    latitude: 26.5319,
    longitude: 53.9804,
  },
  {
    name: 'اهواز',
    nameEn: 'Ahvaz',
    slug: 'ahvaz',
    province: 'خوزستان',
    description: 'مرکز استان خوزستان',
    latitude: 31.3183,
    longitude: 48.6706,
  },
  {
    name: 'رشت',
    nameEn: 'Rasht',
    slug: 'rasht',
    province: 'گیلان',
    description: 'شهر بارانی و سبز شمال ایران',
    latitude: 37.2808,
    longitude: 49.5832,
  },
  {
    name: 'کاشان',
    nameEn: 'Kashan',
    slug: 'kashan',
    province: 'اصفهان',
    description: 'شهر گلاب و معماری سنتی',
    latitude: 33.9831,
    longitude: 51.4364,
  },
  {
    name: 'همدان',
    nameEn: 'Hamadan',
    slug: 'hamadan',
    province: 'همدان',
    description: 'یکی از قدیمی‌ترین شهرهای ایران',
    latitude: 34.7992,
    longitude: 48.5146,
  },
  {
    name: 'کرمانشاه',
    nameEn: 'Kermanshah',
    slug: 'kermanshah',
    province: 'کرمانشاه',
    description: 'شهر تاریخی با آثار باستانی',
    latitude: 34.3142,
    longitude: 47.065,
  },
  {
    name: 'ارومیه',
    nameEn: 'Urmia',
    slug: 'urmia',
    province: 'آذربایجان غربی',
    description: 'شهر کنار دریاچه ارومیه',
    latitude: 37.5527,
    longitude: 45.0761,
  },
  {
    name: 'سنندج',
    nameEn: 'Sanandaj',
    slug: 'sanandaj',
    province: 'کردستان',
    description: 'مرکز استان کردستان',
    latitude: 35.3144,
    longitude: 46.9925,
  },
  {
    name: 'بوشهر',
    nameEn: 'Bushehr',
    slug: 'bushehr',
    province: 'بوشهر',
    description: 'شهر ساحلی خلیج فارس',
    latitude: 28.9234,
    longitude: 50.8203,
  },
  {
    name: 'زاهدان',
    nameEn: 'Zahedan',
    slug: 'zahedan',
    province: 'سیستان و بلوچستان',
    description: 'مرکز استان سیستان و بلوچستان',
    latitude: 29.4963,
    longitude: 60.8629,
  },
  {
    name: 'قم',
    nameEn: 'Qom',
    slug: 'qom',
    province: 'قم',
    description: 'شهر مذهبی و مرکز علوم دینی',
    latitude: 34.6399,
    longitude: 50.8759,
  },
  {
    name: 'اراک',
    nameEn: 'Arak',
    slug: 'arak',
    province: 'مرکزی',
    description: 'مرکز استان مرکزی',
    latitude: 34.0917,
    longitude: 49.6892,
  },
  {
    name: 'زنجان',
    nameEn: 'Zanjan',
    slug: 'zanjan',
    province: 'زنجان',
    description: 'شهر صنایع دستی و چاقوسازی',
    latitude: 36.6736,
    longitude: 48.4787,
  },
  {
    name: 'بندرعباس',
    nameEn: 'Bandar Abbas',
    slug: 'bandar-abbas',
    province: 'هرمزگان',
    description: 'شهر و بندر جنوبی ایران',
    latitude: 27.1865,
    longitude: 56.2808,
  },
  {
    name: 'گرگان',
    nameEn: 'Gorgan',
    slug: 'gorgan',
    province: 'گلستان',
    description: 'مرکز استان گلستان',
    latitude: 36.8433,
    longitude: 54.4446,
  },
  {
    name: 'ساری',
    nameEn: 'Sari',
    slug: 'sari',
    province: 'مازندران',
    description: 'مرکز استان مازندران',
    latitude: 36.5633,
    longitude: 53.0601,
  },
  {
    name: 'اردبیل',
    nameEn: 'Ardabil',
    slug: 'ardabil',
    province: 'اردبیل',
    description: 'شهر کوهستانی شمال غرب ایران',
    latitude: 38.2498,
    longitude: 48.2933,
  },
  {
    name: 'بیرجند',
    nameEn: 'Birjand',
    slug: 'birjand',
    province: 'خراسان جنوبی',
    description: 'مرکز استان خراسان جنوبی',
    latitude: 32.8663,
    longitude: 59.2211,
  },
  {
    name: 'یاسوج',
    nameEn: 'Yasuj',
    slug: 'yasuj',
    province: 'کهگیلویه و بویراحمد',
    description: 'شهر کوهستانی جنوب ایران',
    latitude: 30.6682,
    longitude: 51.5878,
  },
]

// تابع کمکی برای یافتن شهر بر اساس slug
export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((city) => city.slug === slug)
}

// تابع کمکی برای دریافت لیست استان‌ها
export function getProvinces(): string[] {
  return Array.from(new Set(CITIES.map((city) => city.province)))
}

// تابع کمکی برای دریافت شهرهای یک استان
export function getCitiesByProvince(province: string): CityData[] {
  return CITIES.filter((city) => city.province === province)
}
