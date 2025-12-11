import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const guides: Record<string, { title: string; description: string; content: string }> = {
  norooz: {
    title: 'نوروز',
    description: 'نوروز یا سال نو ایرانی، جشن تحویل سال نو در تقویم هجری شمسی است که در اولین روز بهار برگزار می‌شود.',
    content: `
      <h2>تاریخچه نوروز</h2>
      <p>نوروز از دوران باستان ایران زمین برگزار می‌شده و ریشه در فرهنگ ایرانی دارد.</p>

      <h2>آداب و رسوم</h2>
      <ul>
        <li><strong>هفت‌سین:</strong> چیدن سفره‌ای با هفت چیز که با حرف س شروع می‌شود</li>
        <li><strong>خانه‌تکانی:</strong> تمیز کردن خانه قبل از سال نو</li>
        <li><strong>عیدی:</strong> هدیه دادن به کودکان و بزرگ‌ترها</li>
        <li><strong>دیدوبازدید:</strong> رفتن به خانه اقوام و دوستان</li>
      </ul>

      <h2>هفت‌سین</h2>
      <p>اجزای اصلی هفت‌سین عبارتند از:</p>
      <ul>
        <li><strong>سبزه:</strong> نماد رویش و زندگی</li>
        <li><strong>سمنو:</strong> نماد قدرت و برکت</li>
        <li><strong>سنجد:</strong> نماد عشق</li>
        <li><strong>سیر:</strong> نماد سلامتی</li>
        <li><strong>سیب:</strong> نماد زیبایی</li>
        <li><strong>سرکه:</strong> نماد بردباری</li>
        <li><strong>سماق:</strong> نماد طلوع خورشید</li>
      </ul>
    `
  },
  yalda: {
    title: 'شب یلدا',
    description: 'شب یلدا طولانی‌ترین شب سال است که در آخرین شب پاییز برگزار می‌شود.',
    content: `
      <h2>تاریخچه شب یلدا</h2>
      <p>شب یلدا از دوران باستان ایران به یادگار مانده است.</p>

      <h2>آداب و رسوم</h2>
      <ul>
        <li>خوردن هندوانه و انار</li>
        <li>خواندن شعرهای حافظ (فال حافظ)</li>
        <li>گرد هم آمدن خانواده</li>
        <li>خوردن آجیل و میوه</li>
      </ul>
    `
  },
  'chaharshanbe-suri': {
    title: 'چهارشنبه‌سوری',
    description: 'جشن آتش در آخرین چهارشنبه سال',
    content: `
      <h2>تاریخچه</h2>
      <p>چهارشنبه‌سوری یکی از کهن‌ترین جشن‌های ایرانی است.</p>

      <h2>آداب و رسوم</h2>
      <ul>
        <li>روشن کردن آتش</li>
        <li>پریدن از روی آتش</li>
        <li>قاشق زنی (در برخی مناطق)</li>
        <li>فال‌گوش</li>
      </ul>
    `
  },
  'sizdah-bedar': {
    title: 'سیزده‌بدر',
    description: 'روز طبیعت و سیزدهمین روز نوروز',
    content: `
      <h2>تاریخچه</h2>
      <p>سیزده‌بدر سیزدهمین روز فروردین است.</p>

      <h2>آداب و رسوم</h2>
      <ul>
        <li>رفتن به طبیعت</li>
        <li>گره زدن سبزه</li>
        <li>پیک‌نیک خانوادگی</li>
      </ul>
    `
  },
  ashura: {
    title: 'عاشورا و محرم',
    description: 'ماه محرم و مراسم سوگواری',
    content: `
      <h2>تاریخچه</h2>
      <p>ماه محرم ماه اول تقویم قمری است.</p>

      <h2>مراسم</h2>
      <ul>
        <li>برگزاری مراسم عزاداری</li>
        <li>دسته‌های عزاداری</li>
        <li>نذری و طبخ غذا</li>
        <li>تعزیه</li>
      </ul>
    `
  }
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = guides[slug]

  if (!guide) return {}

  return {
    title: `${guide.title} | دانشنامه فرهنگی`,
    description: guide.description
  }
}

export default async function CulturalGuideDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const guide = guides[slug]

  if (!guide) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}/cultural-guide`}
          className="inline-flex items-center gap-2 text-[#A01C1C] hover:underline mb-8"
        >
          <ArrowRight className="w-4 h-4" />
          بازگشت به دانشنامه
        </Link>

        <article className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{guide.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{guide.description}</p>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: guide.content }}
          />
        </article>
      </div>
    </div>
  )
}
