import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'مجله و بلاگ | IranTour Guide',
  description: 'مقالات فرهنگی و گردشگری ایران',
}

const blogPosts = [
  {
    id: '1',
    title: 'بهترین رویدادهای فرهنگی ایران در سال ۱۴۰۴',
    slug: 'best-cultural-events-1404',
    excerpt:
      'ایران سرزمینی با تاریخ و فرهنگ غنی است که هر سال میزبان رویدادهای فرهنگی متنوعی در سراسر کشور است. در این مقاله بهترین رویدادهای فرهنگی سال ۱۴۰۴ را معرفی می‌کنیم.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
    date: '۱۰ فروردین ۱۴۰۴',
    category: 'فرهنگی',
    readTime: '۵ دقیقه',
  },
  {
    id: '2',
    title: 'راهنمای سفر به اصفهان: نصف جهان را بشناسید',
    slug: 'isfahan-travel-guide',
    excerpt:
      'اصفهان یکی از زیباترین شهرهای ایران و جهان است. میدان نقش جهان، سی‌وسه‌پل، مسجد شیخ لطف‌الله و ده‌ها جاذبه دیگر در انتظار شما هستند.',
    image: 'https://images.unsplash.com/photo-1567696153798-37c3dad9d3f6?w=800',
    date: '۲۵ اسفند ۱۴۰۳',
    category: 'گردشگری',
    readTime: '۸ دقیقه',
  },
  {
    id: '3',
    title: 'آشنایی با جشن‌های باستانی ایران',
    slug: 'ancient-iranian-festivals',
    excerpt:
      'نوروز، یلدا، چهارشنبه‌سوری و سیزده‌بدر از جمله جشن‌های باستانی ایران هستند که قدمتی هزاران ساله دارند و هنوز هم با شکوه برگزار می‌شوند.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800',
    date: '۱۵ اسفند ۱۴۰۳',
    category: 'تاریخی',
    readTime: '۶ دقیقه',
  },
  {
    id: '4',
    title: 'سفر به شیراز: شهر عشق و شعر',
    slug: 'shiraz-city-of-love',
    excerpt:
      'شیراز با باغ‌ها، مسجد نصیرالملک، حافظیه و سعدیه یکی از محبوب‌ترین مقاصد گردشگری ایران است. در این مقاله هر آنچه باید درباره سفر به شیراز بدانید.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
    date: '۵ اسفند ۱۴۰۳',
    category: 'گردشگری',
    readTime: '۷ دقیقه',
  },
  {
    id: '5',
    title: 'جشنواره گلاب‌گیری کاشان: تجربه‌ای فراموش‌نشدنی',
    slug: 'kashan-rosewater-festival',
    excerpt:
      'هر سال در اردیبهشت، روستای قمصر کاشان میزبان جشنواره سنتی گلاب‌گیری است. عطر گل محمدی و فضای صمیمی این جشن تجربه‌ای بی‌نظیر فراهم می‌کند.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
    date: '۲۰ بهمن ۱۴۰۳',
    category: 'فرهنگی',
    readTime: '۴ دقیقه',
  },
  {
    id: '6',
    title: 'یزد: شهر بادگیرها و میراث جهانی',
    slug: 'yazd-world-heritage',
    excerpt:
      'یزد با معماری کویری منحصربه‌فرد، بادگیرها، آتشکده و بافت تاریخی ثبت شده در میراث جهانی یونسکو، مقصدی بی‌نظیر برای گردشگران فرهنگی است.',
    image: 'https://images.unsplash.com/photo-1578059760979-a1b5c1d69b1d?w=800',
    date: '۱۰ بهمن ۱۴۰۳',
    category: 'گردشگری',
    readTime: '۵ دقیقه',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="kashi-star-pattern py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-yellow-100 mb-6 drop-shadow-lg">
            📰 مجله گردشگری
          </h1>
          <p className="text-xl text-yellow-50 font-bold drop-shadow">
            مقالات فرهنگی، گردشگری و تاریخی ایران
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="kashi-card overflow-hidden group"
              >
                <div className="relative h-52 overflow-hidden bg-gray-200">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="kashi-badge px-4 py-1.5 text-xs">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-black text-red-900 mb-3 line-clamp-2 group-hover:text-gold transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 font-medium mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-600 font-bold">
                    <span>📅 {post.date}</span>
                    <span>⏱️ {post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
