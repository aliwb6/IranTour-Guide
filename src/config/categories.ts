export const eventCategories = [
  {
    id: 'national-official',
    name: 'مناسبت‌های رسمی و ملی',
    nameEn: 'National & Official Events',
    slug: 'national-official',
    icon: '🏛️',
    color: '#3B82F6',
    description: 'رویدادهای ملی و رسمی ایران',
  },
  {
    id: 'religious',
    name: 'مناسبت‌های مذهبی و آیینی',
    nameEn: 'Religious Events',
    slug: 'religious',
    icon: '🕌',
    color: '#10B981',
    description: 'مراسم و جشن‌های مذهبی',
  },
  {
    id: 'cultural-festivals',
    name: 'جشنواره‌های فرهنگی',
    nameEn: 'Cultural Festivals',
    slug: 'cultural-festivals',
    icon: '🎭',
    color: '#F59E0B',
    description: 'جشنواره‌های فرهنگی و هنری',
  },
  {
    id: 'cinema-film',
    name: 'سینما و فیلم',
    nameEn: 'Cinema & Film',
    slug: 'cinema-film',
    icon: '🎬',
    color: '#8B5CF6',
    description: 'جشنواره‌ها و رویدادهای سینمایی',
  },
  {
    id: 'music-art',
    name: 'موسیقی و هنر',
    nameEn: 'Music & Art',
    slug: 'music-art',
    icon: '🎵',
    color: '#EC4899',
    description: 'کنسرت‌ها و نمایشگاه‌های هنری',
  },
  {
    id: 'scientific',
    name: 'علمی و پژوهشی',
    nameEn: 'Scientific & Research',
    slug: 'scientific',
    icon: '🔬',
    color: '#06B6D4',
    description: 'همایش‌ها و کنفرانس‌های علمی',
  },
  {
    id: 'nature-tourism',
    name: 'طبیعت‌گردی و تورهای ویژه',
    nameEn: 'Nature & Special Tours',
    slug: 'nature-tourism',
    icon: '🏔️',
    color: '#22C55E',
    description: 'تورهای طبیعت‌گردی و کوهنوردی',
  },
  {
    id: 'exhibitions',
    name: 'نمایشگاهی',
    nameEn: 'Exhibitions',
    slug: 'exhibitions',
    icon: '🎨',
    color: '#F97316',
    description: 'نمایشگاه‌های تجاری و هنری',
  },
  {
    id: 'economic',
    name: 'اقتصادی و تجاری',
    nameEn: 'Economic & Trade',
    slug: 'economic',
    icon: '💼',
    color: '#6366F1',
    description: 'رویدادهای تجاری و اقتصادی',
  },
  {
    id: 'sports',
    name: 'ورزشی',
    nameEn: 'Sports',
    slug: 'sports',
    icon: '⚽',
    color: '#EF4444',
    description: 'مسابقات و رویدادهای ورزشی',
  },
]

export const getCategoryBySlug = (slug: string) => {
  return eventCategories.find((cat) => cat.slug === slug)
}

export const getCategoryById = (id: string) => {
  return eventCategories.find((cat) => cat.id === id)
}