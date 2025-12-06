import type { MockCity } from '@/types/mock'

// ===== لیست شهرهای مهم ایران =====
export const mockCities: MockCity[] = [
  {
    id: '1',
    name: 'تهران',
    englishName: 'Tehran',
    eventCount: 45,
  },
  {
    id: '2',
    name: 'اصفهان',
    englishName: 'Isfahan',
    eventCount: 32,
  },
  {
    id: '3',
    name: 'شیراز',
    englishName: 'Shiraz',
    eventCount: 28,
  },
  {
    id: '4',
    name: 'مشهد',
    englishName: 'Mashhad',
    eventCount: 35,
  },
  {
    id: '5',
    name: 'تبریز',
    englishName: 'Tabriz',
    eventCount: 22,
  },
  {
    id: '6',
    name: 'کاشان',
    englishName: 'Kashan',
    eventCount: 15,
  },
  {
    id: '7',
    name: 'یزد',
    englishName: 'Yazd',
    eventCount: 18,
  },
  {
    id: '8',
    name: 'کیش',
    englishName: 'Kish',
    eventCount: 12,
  },
  {
    id: '9',
    name: 'بوشهر',
    englishName: 'Bushehr',
    eventCount: 8,
  },
  {
    id: '10',
    name: 'رشت',
    englishName: 'Rasht',
    eventCount: 14,
  },
]

// ===== شهرهای پرطرفدار =====
export const getPopularCities = () => {
  return mockCities.slice(0, 5)
}
