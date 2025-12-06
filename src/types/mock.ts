// ===== Types ساده برای Mock Data =====

export interface MockEvent {
  id: string
  title: string
  slug: string
  city: string
  type: string // نوع: هنری، مذهبی، ملی، فرهنگی، ...
  style: string // سبک: جشنواره، نمایشگاه، ...
  startDate: string // تاریخ شمسی
  endDate: string
  image: string
  shortDescription: string
  longDescription?: string
  featured: boolean
  emoji?: string
}

export interface MockCity {
  id: string
  name: string
  englishName: string
  eventCount: number
}

export interface MockCategory {
  id: string
  name: string
  emoji: string
  description: string
}
