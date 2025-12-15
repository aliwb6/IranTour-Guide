import Link from 'next/link'
import { Calendar, Sparkles, Moon, Sun, Flower } from 'lucide-react'

const guides = [
  {
    slug: 'norooz',
    title: 'نوروز',
    description: 'جشن سال نو ایرانی و آداب و رسوم آن',
    icon: Flower,
    color: 'bg-green-100 text-green-600',
  },
  {
    slug: 'yalda',
    title: 'شب یلدا',
    description: 'طولانی‌ترین شب سال و جشن آن',
    icon: Moon,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    slug: 'chaharshanbe-suri',
    title: 'چهارشنبه‌سوری',
    description: 'جشن آتش و آخرین چهارشنبه سال',
    icon: Sparkles,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    slug: 'sizdah-bedar',
    title: 'سیزده‌بدر',
    description: 'روز طبیعت و سیزدهمین روز نوروز',
    icon: Sun,
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    slug: 'ashura',
    title: 'عاشورا و محرم',
    description: 'ماه محرم و مراسم سوگواری',
    icon: Calendar,
    color: 'bg-gray-100 text-gray-600',
  },
]

export const metadata = {
  title: 'دانشنامه فرهنگی | IranTour Guide',
  description: 'آشنایی با جشن‌ها و مناسبت‌های ایرانی',
}

export default async function CulturalGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">دانشنامه فرهنگی</h1>
          <p className="text-xl text-gray-600">آشنایی با جشن‌ها و مناسبت‌های ایرانی</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => {
            const Icon = guide.icon

            return (
              <Link
                key={guide.slug}
                href={`/${locale}/cultural-guide/${guide.slug}`}
                className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow text-center"
              >
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${guide.color} mb-6`}
                >
                  <Icon className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{guide.title}</h2>
                <p className="text-gray-600">{guide.description}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
