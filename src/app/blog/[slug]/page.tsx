import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  image: string
  date: string
  category: string
  readTime: string
  author: string
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'بهترین رویدادهای فرهنگی ایران در سال ۱۴۰۴',
    slug: 'best-cultural-events-1404',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
    date: '۱۰ فروردین ۱۴۰۴',
    category: 'فرهنگی',
    readTime: '۵ دقیقه',
    author: 'تیم IranTour Guide',
    content: `ایران سرزمینی با تاریخ و فرهنگ غنی است که هر سال میزبان رویدادهای فرهنگی متنوعی در سراسر کشور است.

جشنواره فیلم فجر
بزرگ‌ترین رویداد سینمایی ایران که هر سال در بهمن ماه برگزار می‌شود. این جشنواره محلی برای نمایش آخرین ساخته‌های سینمای ایران و جهان است و حضور کارگردانان و بازیگران برجسته از ویژگی‌های آن است.

نمایشگاه کتاب تهران
بزرگ‌ترین نمایشگاه کتاب خاورمیانه که در اردیبهشت و خرداد برگزار می‌شود. صدها ناشر داخلی و خارجی آثار خود را در این نمایشگاه عرضه می‌کنند.

جشن گلاب‌گیری کاشان
هر سال در اردیبهشت ماه در روستای قمصر کاشان، جشن سنتی گلاب‌گیری برگزار می‌شود. عطر گل محمدی و فضای صمیمی این جشن تجربه‌ای فراموش‌نشدنی است.

جشنواره موسیقی فجر
یکی از معتبرترین رویدادهای موسیقایی ایران که میزبان هنرمندان برجسته موسیقی سنتی، کلاسیک و پاپ ایرانی است.

نکته مهم: برای شرکت در این رویدادها، توصیه می‌شود از قبل برنامه‌ریزی و رزرو انجام دهید.`,
  },
  {
    id: '2',
    title: 'راهنمای سفر به اصفهان: نصف جهان را بشناسید',
    slug: 'isfahan-travel-guide',
    image: 'https://images.unsplash.com/photo-1567696153798-37c3dad9d3f6?w=800',
    date: '۲۵ اسفند ۱۴۰۳',
    category: 'گردشگری',
    readTime: '۸ دقیقه',
    author: 'تیم IranTour Guide',
    content: `اصفهان یکی از زیباترین شهرهای ایران و جهان است که به حق لقب «نصف جهان» را دارد.

میدان نقش جهان
میدان نقش جهان، دومین میدان بزرگ جهان، مرکز تاریخی اصفهان است. این میدان با مسجد شاه، مسجد شیخ لطف‌الله، کاخ عالی‌قاپو و بازار قیصریه احاطه شده است.

پل‌های تاریخی
سی‌وسه‌پل و پل خواجو از زیباترین سازه‌های معماری ایران هستند. عبور از این پل‌ها در شب‌های اصفهان تجربه‌ای رمانتیک و فراموش‌نشدنی است.

بهترین زمان سفر
بهار بهترین زمان سفر به اصفهان است. هوا معتدل است و درختان شکوفه‌های زیبایی دارند. پاییز نیز با رنگ‌های زرد و نارنجی درختان، اصفهان را زیباتر می‌کند.

غذاهای محلی
بریانی اصفهان، خورشت ماست، فریده و گز از مشهورترین غذاها و سوغات‌های اصفهان هستند.`,
  },
  {
    id: '3',
    title: 'آشنایی با جشن‌های باستانی ایران',
    slug: 'ancient-iranian-festivals',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800',
    date: '۱۵ اسفند ۱۴۰۳',
    category: 'تاریخی',
    readTime: '۶ دقیقه',
    author: 'تیم IranTour Guide',
    content: `ایران سرزمین جشن‌ها و آیین‌های باستانی است. بسیاری از این جشن‌ها قدمتی هزاران ساله دارند.

نوروز
نوروز بزرگ‌ترین جشن ملی ایرانیان است که با تحویل سال و آغاز بهار جشن گرفته می‌شود. سفره هفت‌سین، خانه‌تکانی، دید و بازدید و سیزده‌بدر از آداب و رسوم نوروزی هستند.

شب یلدا
بلندترین شب سال که خانواده‌ها دور هم جمع می‌شوند. خوردن هندوانه و انار، فال حافظ و شب‌نشینی گرم خانوادگی از سنت‌های یلداست.

چهارشنبه‌سوری
آخرین چهارشنبه سال با روشن کردن آتش و پریدن از روی آن جشن گرفته می‌شود. این آیین نماد پاک شدن از بدی‌ها و استقبال از سال نو است.

سیزده‌بدر
روز طبیعت، سیزدهمین روز فروردین، خانواده‌ها به طبیعت می‌روند و پیک‌نیک برگزار می‌کنند.`,
  },
  {
    id: '4',
    title: 'سفر به شیراز: شهر عشق و شعر',
    slug: 'shiraz-city-of-love',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
    date: '۵ اسفند ۱۴۰۳',
    category: 'گردشگری',
    readTime: '۷ دقیقه',
    author: 'تیم IranTour Guide',
    content: `شیراز، شهر شعر و عرفان، با آرامگاه حافظ و سعدی یکی از محبوب‌ترین مقاصد گردشگری ایران است.

حافظیه
آرامگاه حافظ شیرازی، شاعر بزرگ فارسی‌زبان، یکی از زیباترین مکان‌های شیراز است. فال حافظ و شعرخوانی در فضای معنوی حافظیه تجربه‌ای فراموش‌نشدنی است.

مسجد نصیرالملک
مسجد نصیرالملک یا مسجد صورتی، با شیشه‌های رنگی زیبا و نورافشانی خیره‌کننده در صبح‌ها، یکی از جذاب‌ترین مساجد جهان است.

تخت جمشید
تخت جمشید، پایتخت تشریفاتی شاهنشاهی هخامنشی، در ۷۰ کیلومتری شیراز قرار دارد و از مهم‌ترین آثار باستانی جهان است.`,
  },
  {
    id: '5',
    title: 'جشنواره گلاب‌گیری کاشان: تجربه‌ای فراموش‌نشدنی',
    slug: 'kashan-rosewater-festival',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
    date: '۲۰ بهمن ۱۴۰۳',
    category: 'فرهنگی',
    readTime: '۴ دقیقه',
    author: 'تیم IranTour Guide',
    content: `هر سال در اردیبهشت ماه، روستای قمصر کاشان میزبان یکی از زیباترین جشن‌های سنتی ایران است.

جشن گلاب‌گیری
فرآیند سنتی تقطیر گل محمدی و تولید گلاب به نمایش گذاشته می‌شود. بازدیدکنندگان می‌توانند در کارگاه‌های گلاب‌گیری شرکت کنند و از گلستان‌های زیبا بازدید نمایند.

عطر گل محمدی
عطر دل‌انگیز گل محمدی تمام فضا را پر می‌کند و تجربه‌ای حسی بی‌نظیر فراهم می‌آورد.

خانه‌های تاریخی کاشان
در کنار جشن گلاب‌گیری، می‌توانید از خانه‌های تاریخی بروجردی‌ها و طباطبایی‌ها و همچنین باغ فین بازدید کنید.`,
  },
  {
    id: '6',
    title: 'یزد: شهر بادگیرها و میراث جهانی',
    slug: 'yazd-world-heritage',
    image: 'https://images.unsplash.com/photo-1578059760979-a1b5c1d69b1d?w=800',
    date: '۱۰ بهمن ۱۴۰۳',
    category: 'گردشگری',
    readTime: '۵ دقیقه',
    author: 'تیم IranTour Guide',
    content: `یزد با معماری کویری منحصربه‌فرد و بافت تاریخی ثبت شده در میراث جهانی یونسکو، مقصدی بی‌نظیر برای گردشگران فرهنگی است.

بادگیرها
بادگیرهای یزد سیستم خنک‌کننده طبیعی هوشمندانه‌ای هستند که قرن‌ها قبل ابداع شده‌اند.

آتشکده یزد
آتشکده یزد با آتش مقدسی که بیش از ۱۵۰۰ سال است روشن مانده، یکی از مهم‌ترین اماکن زرتشتیان جهان است.

شیرینی‌های سنتی
باقلوا، قطاب و پشمک یزد از مشهورترین شیرینی‌های سنتی ایران هستند.`,
  },
]

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative h-[350px] md:h-[450px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </div>

        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-4xl mx-auto px-4 pb-12 w-full">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm text-yellow-200 font-bold">
                <Link href="/" className="hover:text-yellow-100 transition">
                  خانه
                </Link>
                <span>›</span>
                <Link href="/blog" className="hover:text-yellow-100 transition">
                  مجله
                </Link>
                <span>›</span>
                <span className="text-yellow-100">{post.title}</span>
              </div>
            </div>

            <span className="kashi-badge px-4 py-1.5 text-xs mb-4 inline-block">
              {post.category}
            </span>

            <h1 className="text-3xl md:text-5xl font-black text-yellow-100 mb-4 drop-shadow-2xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-yellow-200 text-sm font-bold">
              <span>📅 {post.date}</span>
              <span>⏱️ {post.readTime}</span>
              <span>✍️ {post.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <article className="kashi-card p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-loose font-medium text-base md:text-lg whitespace-pre-line">
              {post.content}
            </div>
          </div>
        </article>

        {/* Navigation */}
        <div className="flex justify-center mt-10">
          <Link
            href="/blog"
            className="deep-persian-btn px-8 py-4 font-black inline-block"
          >
            ← بازگشت به مجله
          </Link>
        </div>
      </div>
    </div>
  )
}
