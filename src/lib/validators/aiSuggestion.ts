import { z } from 'zod'

// Form validation schema
export const formSchema = z.object({
  fullName: z.string().min(2, 'نام باید حداقل ۲ حرف باشد').max(50, 'نام نباید بیشتر از ۵۰ حرف باشد'),
  email: z.string().email('ایمیل نامعتبر است'),
  age: z.number().min(10, 'سن باید حداقل ۱۰ سال باشد').max(100, 'سن نباید بیشتر از ۱۰۰ سال باشد').optional(),
  bio: z.string()
    .min(100, 'بیوگرافی باید حداقل ۱۰۰ حرف باشد')
    .max(500, 'بیوگرافی نباید بیشتر از ۵۰۰ حرف باشد'),
  interests: z.array(z.string())
    .min(1, 'حداقل یک علاقه انتخاب کنید')
    .max(6, 'حداکثر ۶ علاقه می‌توانید انتخاب کنید'),
  startDate: z.string(), // ISO date string
  endDate: z.string(),   // ISO date string
  cities: z.array(z.string())
    .min(1, 'حداقل یک شهر انتخاب کنید')
    .max(5, 'حداکثر ۵ شهر می‌توانید انتخاب کنید'),
  budget: z.enum(['low', 'medium', 'high']).optional()
}).refine(data => {
  const start = new Date(data.startDate)
  const end = new Date(data.endDate)
  return end > start
}, {
  message: 'تاریخ پایان باید بعد از تاریخ شروع باشد',
  path: ['endDate']
})

// AI suggestion response schema
export const suggestionSchema = z.object({
  suggestedEvents: z.array(z.object({
    eventId: z.string(),
    relevanceScore: z.number().min(0).max(100),
    reason: z.string()
  })),
  itinerary: z.array(z.object({
    day: z.number(),
    date: z.string(),
    city: z.string(),
    morning: z.string(),
    afternoon: z.string(),
    evening: z.string(),
    events: z.array(z.string())
  })),
  summary: z.string(),
  tips: z.array(z.string())
})

// Type exports
export type FormData = z.infer<typeof formSchema>
export type SuggestionData = z.infer<typeof suggestionSchema>

// Available interests
export const INTERESTS = [
  "تاریخ و معماری",
  "سینما و فیلم",
  "موسیقی",
  "هنرهای تجسمی",
  "طبیعت و کوهنوردی",
  "مذهب و معنویت",
  "غذا و آشپزی",
  "فرهنگ بومی",
  "علم و فناوری",
  "ورزش",
  "جشنواره‌ها",
  "نمایشگاه‌ها"
] as const

// Available cities
export const CITIES = [
  "تهران",
  "اصفهان",
  "شیراز",
  "مشهد",
  "یزد",
  "تبریز",
  "کاشان",
  "کرمان",
  "رشت",
  "قزوین"
] as const

// Budget options
export const BUDGET_OPTIONS = [
  { value: 'low', label: 'اقتصادی', icon: '💰' },
  { value: 'medium', label: 'متوسط', icon: '💰💰' },
  { value: 'high', label: 'لوکس', icon: '💰💰💰' }
] as const
