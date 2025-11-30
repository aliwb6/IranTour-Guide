// src/config/categories.ts
// داده‌های دسته‌بندی‌های رویدادها

export interface CategoryData {
  name: string
  nameEn: string
  slug: string
  description: string
  icon: string
  color: string
}

export const CATEGORIES: CategoryData[] = [
  {
    name: 'مناسبت‌های ملی',
    nameEn: 'National Events',
    slug: 'national-events',
    description: 'جشن‌های ملی و رویدادهای مرتبط با تاریخ و فرهنگ ایران',
    icon: '🇮🇷',
    color: '#10b981',
  },
  {
    name: 'مذهبی',
    nameEn: 'Religious',
    slug: 'religious',
    description: 'مناسبت‌های مذهبی، مراسم و آیین‌های دینی',
    icon: '🕌',
    color: '#3b82f6',
  },
  {
    name: 'فرهنگی و هنری',
    nameEn: 'Cultural & Art',
    slug: 'cultural-art',
    description: 'رویدادهای فرهنگی، هنری و نمایشگاه‌های هنری',
    icon: '🎭',
    color: '#8b5cf6',
  },
  {
    name: 'سینما و فیلم',
    nameEn: 'Cinema & Film',
    slug: 'cinema-film',
    description: 'جشنواره‌های فیلم، اکران و رویدادهای سینمایی',
    icon: '🎬',
    color: '#ef4444',
  },
  {
    name: 'موسیقی',
    nameEn: 'Music',
    slug: 'music',
    description: 'کنسرت‌ها، جشنواره‌های موسیقی و رویدادهای موسیقایی',
    icon: '🎵',
    color: '#f59e0b',
  },
  {
    name: 'علمی و آموزشی',
    nameEn: 'Scientific & Educational',
    slug: 'scientific-educational',
    description: 'کنفرانس‌ها، سمینارها و رویدادهای علمی و آموزشی',
    icon: '🔬',
    color: '#06b6d4',
  },
  {
    name: 'طبیعت‌گردی',
    nameEn: 'Nature & Tourism',
    slug: 'nature-tourism',
    description: 'رویدادهای گردشگری، طبیعت‌گردی و کوهنوردی',
    icon: '🏔️',
    color: '#059669',
  },
  {
    name: 'نمایشگاهی',
    nameEn: 'Exhibition',
    slug: 'exhibition',
    description: 'نمایشگاه‌های تخصصی، صنعتی و تجاری',
    icon: '🏛️',
    color: '#6366f1',
  },
  {
    name: 'اقتصادی و تجاری',
    nameEn: 'Economic & Business',
    slug: 'economic-business',
    description: 'رویدادهای اقتصادی، همایش‌های تجاری و کارآفرینی',
    icon: '💼',
    color: '#64748b',
  },
  {
    name: 'ورزشی',
    nameEn: 'Sports',
    slug: 'sports',
    description: 'رویدادهای ورزشی، مسابقات و جشنواره‌های ورزشی',
    icon: '⚽',
    color: '#14b8a6',
  },
  {
    name: 'غذا و آشپزی',
    nameEn: 'Food & Culinary',
    slug: 'food-culinary',
    description: 'جشنواره‌های غذا، آشپزی و فرهنگ غذایی',
    icon: '🍲',
    color: '#f97316',
  },
  {
    name: 'کتاب و ادبیات',
    nameEn: 'Books & Literature',
    slug: 'books-literature',
    description: 'نمایشگاه کتاب، شب‌های شعر و رویدادهای ادبی',
    icon: '📚',
    color: '#a855f7',
  },
  {
    name: 'تکنولوژی',
    nameEn: 'Technology',
    slug: 'technology',
    description: 'رویدادهای فناوری، استارتاپ‌ها و نوآوری',
    icon: '💻',
    color: '#0ea5e9',
  },
  {
    name: 'سنتی و محلی',
    nameEn: 'Traditional & Local',
    slug: 'traditional-local',
    description: 'جشن‌های سنتی، آیین‌های محلی و فرهنگ بومی',
    icon: '🎊',
    color: '#ec4899',
  },
  {
    name: 'خانوادگی و کودکان',
    nameEn: 'Family & Children',
    slug: 'family-children',
    description: 'رویدادهای خانوادگی، کودکان و نوجوانان',
    icon: '👨‍👩‍👧‍👦',
    color: '#f43f5e',
  },
]

// تابع کمکی برای یافتن دسته‌بندی بر اساس slug
export function getCategoryBySlug(slug: string): CategoryData | undefined {
  return CATEGORIES.find((category) => category.slug === slug)
}

// تابع کمکی برای دریافت رنگ دسته‌بندی
export function getCategoryColor(slug: string): string {
  const category = getCategoryBySlug(slug)
  return category?.color || '#6b7280'
}

// تابع کمکی برای دریافت آیکون دسته‌بندی
export function getCategoryIcon(slug: string): string {
  const category = getCategoryBySlug(slug)
  return category?.icon || '📌'
}
