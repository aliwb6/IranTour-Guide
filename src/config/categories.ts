export interface EventCategory {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  icon: string;
  emoji: string;
  description: string;
  color: string;
  bgGradient: string;
}

export const eventCategories: EventCategory[] = [
  {
    id: "1",
    name: "مناسبت‌های ملی",
    nameEn: "National Events",
    slug: "national",
    icon: "🇮🇷",
    emoji: "🇮🇷",
    description: "جشن‌های ملی، روزهای تاریخی و مناسبت‌های میهنی ایران",
    color: "from-green-600 to-green-800",
    bgGradient: "bg-gradient-to-br from-green-600 to-green-800",
  },
  {
    id: "2",
    name: "مذهبی",
    nameEn: "Religious",
    slug: "religious",
    icon: "🕌",
    emoji: "🕌",
    description: "مناسبت‌های مذهبی، مراسم عزاداری و جشن‌های مذهبی",
    color: "from-purple-600 to-purple-800",
    bgGradient: "bg-gradient-to-br from-purple-600 to-purple-800",
  },
  {
    id: "3",
    name: "فرهنگی و هنری",
    nameEn: "Cultural & Art",
    slug: "cultural-art",
    icon: "🎭",
    emoji: "🎭",
    description: "جشنواره‌های فرهنگی، نمایش‌های هنری و رویدادهای فرهنگی",
    color: "from-pink-600 to-pink-800",
    bgGradient: "bg-gradient-to-br from-pink-600 to-pink-800",
  },
  {
    id: "4",
    name: "علمی و آموزشی",
    nameEn: "Scientific & Educational",
    slug: "scientific",
    icon: "📚",
    emoji: "📚",
    description: "همایش‌ها، سمینارها و رویدادهای علمی و آموزشی",
    color: "from-blue-600 to-blue-800",
    bgGradient: "bg-gradient-to-br from-blue-600 to-blue-800",
  },
  {
    id: "5",
    name: "طبیعت‌گردی",
    nameEn: "Nature & Eco-tourism",
    slug: "nature",
    icon: "🏔️",
    emoji: "🏔️",
    description: "کوهنوردی، طبیعت‌گردی و رویدادهای محیط زیستی",
    color: "from-emerald-600 to-emerald-800",
    bgGradient: "bg-gradient-to-br from-emerald-600 to-emerald-800",
  },
  {
    id: "6",
    name: "سینما و فیلم",
    nameEn: "Cinema & Film",
    slug: "cinema",
    icon: "🎬",
    emoji: "🎬",
    description: "جشنواره‌های فیلم، اکران‌های سینمایی و رویدادهای سینمایی",
    color: "from-red-600 to-red-800",
    bgGradient: "bg-gradient-to-br from-red-600 to-red-800",
  },
  {
    id: "7",
    name: "موسیقی",
    nameEn: "Music",
    slug: "music",
    icon: "🎵",
    emoji: "🎵",
    description: "کنسرت‌ها، جشنواره‌های موسیقی و رویدادهای موسیقایی",
    color: "from-indigo-600 to-indigo-800",
    bgGradient: "bg-gradient-to-br from-indigo-600 to-indigo-800",
  },
  {
    id: "8",
    name: "نمایشگاهی",
    nameEn: "Exhibition",
    slug: "exhibition",
    icon: "🎨",
    emoji: "🎨",
    description: "نمایشگاه‌های هنری، صنایع دستی و نمایشگاه‌های تخصصی",
    color: "from-orange-600 to-orange-800",
    bgGradient: "bg-gradient-to-br from-orange-600 to-orange-800",
  },
  {
    id: "9",
    name: "غذا و آشپزی",
    nameEn: "Food & Culinary",
    slug: "food",
    icon: "🍲",
    emoji: "🍲",
    description: "جشنواره‌های غذا، آشپزی و رویدادهای آشپزی",
    color: "from-yellow-600 to-yellow-800",
    bgGradient: "bg-gradient-to-br from-yellow-600 to-yellow-800",
  },
  {
    id: "10",
    name: "ورزشی",
    nameEn: "Sports",
    slug: "sports",
    icon: "⚽",
    emoji: "⚽",
    description: "رویدادهای ورزشی، مسابقات و جشنواره‌های ورزشی",
    color: "from-cyan-600 to-cyan-800",
    bgGradient: "bg-gradient-to-br from-cyan-600 to-cyan-800",
  },
  {
    id: "11",
    name: "کودک و نوجوان",
    nameEn: "Children & Youth",
    slug: "children",
    icon: "🧸",
    emoji: "🧸",
    description: "رویدادهای کودکان و نوجوانان",
    color: "from-rose-600 to-rose-800",
    bgGradient: "bg-gradient-to-br from-rose-600 to-rose-800",
  },
  {
    id: "12",
    name: "صنایع دستی",
    nameEn: "Handicrafts",
    slug: "handicrafts",
    icon: "🏺",
    emoji: "🏺",
    description: "نمایشگاه‌های صنایع دستی و هنرهای سنتی ایرانی",
    color: "from-amber-600 to-amber-800",
    bgGradient: "bg-gradient-to-br from-amber-600 to-amber-800",
  },
];

export const getCategoryBySlug = (slug: string): EventCategory | undefined => {
  return eventCategories.find((category) => category.slug === slug);
};

export const getCategoryById = (id: string): EventCategory | undefined => {
  return eventCategories.find((category) => category.id === id);
};

export const popularCategories = eventCategories.slice(0, 8);
