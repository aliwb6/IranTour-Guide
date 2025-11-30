import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { EventCard } from '@/components/events/EventCard';
import { PersianDivider } from '@/components/shared/PersianDivider';
import { StatsCard } from '@/components/shared/StatsCard';
import { SearchBar } from '@/components/shared/SearchBar';
import { TagButton } from '@/components/shared/TagButton';
import Link from 'next/link';
import type { Event } from '@/types';

// Mock featured events data with Unsplash images
const featuredEvents: Event[] = [
  {
    id: '1',
    title: 'جشنواره فیلم فجر ۱۴۰۴',
    shortDescription:
      'بزرگترین رویداد سینمایی کشور با نمایش بهترین فیلم‌های سال و حضور کارگردانان برتر',
    featuredImage: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop',
    style: 'FESTIVAL',
    type: 'جشنواره',
    city: 'تهران',
    province: 'تهران',
    dateRangeText: '۲۰ تا ۳۰ بهمن ۱۴۰۳',
    shamsiStartDate: '۱۴۰۳/۱۱/۲۰',
    shamsiEndDate: '۱۴۰۳/۱۱/۳۰',
    startDate: '2025-02-09',
    endDate: '2025-02-19',
    status: 'UPCOMING',
    tags: ['سینما', 'فیلم', 'هنر'],
    isFeatured: true,
  },
  {
    id: '2',
    title: 'نمایشگاه کتاب تهران',
    shortDescription:
      'بزرگترین رویداد کتاب کشور با حضور ناشران داخلی و خارجی و معرفی آخرین آثار ادبی',
    featuredImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
    style: 'EXHIBITION',
    type: 'نمایشگاه',
    city: 'تهران',
    province: 'تهران',
    dateRangeText: '۲۵ اردیبهشت تا ۵ خرداد ۱۴۰۴',
    shamsiStartDate: '۱۴۰۴/۰۲/۲۵',
    shamsiEndDate: '۱۴۰۴/۰۳/۰۵',
    startDate: '2025-05-15',
    endDate: '2025-05-26',
    status: 'UPCOMING',
    tags: ['کتاب', 'فرهنگ', 'ادبیات'],
    isFeatured: true,
  },
  {
    id: '3',
    title: 'جشن نوروز ۱۴۰۴',
    shortDescription:
      'جشن سال نو ایرانی با برنامه‌های متنوع فرهنگی، موسیقی سنتی و نمایش‌های محلی در سراسر کشور',
    featuredImage: 'https://images.unsplash.com/photo-1553729784-e91953dec042?w=800&h=600&fit=crop',
    style: 'FESTIVAL',
    type: 'ملی',
    city: 'سراسر ایران',
    province: 'سراسر کشور',
    dateRangeText: '۱ تا ۱۳ فروردین ۱۴۰۴',
    shamsiStartDate: '۱۴۰۴/۰۱/۰۱',
    shamsiEndDate: '۱۴۰۴/۰۱/۱۳',
    startDate: '2025-03-21',
    endDate: '2025-04-02',
    status: 'UPCOMING',
    tags: ['نوروز', 'فرهنگ', 'جشن'],
    isFeatured: true,
  },
  {
    id: '4',
    title: 'همایش گردشگری پایدار',
    shortDescription:
      'همایش ملی گردشگری پایدار با محوریت توسعه اکوتوریسم و معرفی جاذبه‌های طبیعی ایران',
    featuredImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
    style: 'CONFERENCE',
    type: 'همایش',
    city: 'شیراز',
    province: 'فارس',
    dateRangeText: '۲۰ فروردین ۱۴۰۴',
    shamsiStartDate: '۱۴۰۴/۰۱/۲۰',
    startDate: '2025-04-09',
    status: 'UPCOMING',
    tags: ['گردشگری', 'محیط زیست', 'توسعه'],
    isFeatured: true,
  },
  {
    id: '5',
    title: 'جشنواره موسیقی فجر',
    shortDescription:
      'بزرگترین رویداد موسیقی کشور با اجرای هنرمندان برجسته و معرفی آثار نو در موسیقی ایرانی',
    featuredImage: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop',
    style: 'FESTIVAL',
    type: 'جشنواره',
    city: 'تهران',
    province: 'تهران',
    dateRangeText: '۱۰ تا ۲۰ بهمن ۱۴۰۳',
    shamsiStartDate: '۱۴۰۳/۱۱/۱۰',
    shamsiEndDate: '۱۴۰۳/۱۱/۲۰',
    startDate: '2025-01-30',
    endDate: '2025-02-09',
    status: 'ONGOING',
    tags: ['موسیقی', 'جشنواره', 'هنر'],
    isFeatured: true,
  },
  {
    id: '6',
    title: 'نمایشگاه صنایع دستی',
    shortDescription:
      'نمایشگاه بین‌المللی صنایع دستی و هنرهای سنتی ایران با حضور هنرمندان سراسر کشور',
    featuredImage: 'https://images.unsplash.com/photo-1582571425129-c6eb12ecc8c9?w=800&h=600&fit=crop',
    style: 'EXHIBITION',
    type: 'نمایشگاه',
    city: 'اصفهان',
    province: 'اصفهان',
    dateRangeText: '۱۵ تا ۲۵ فروردین ۱۴۰۴',
    shamsiStartDate: '۱۴۰۴/۰۱/۱۵',
    shamsiEndDate: '۱۴۰۴/۰۱/۲۵',
    startDate: '2025-04-04',
    endDate: '2025-04-14',
    status: 'UPCOMING',
    tags: ['صنایع دستی', 'اصفهان', 'هنر'],
    isFeatured: true,
  },
];

const popularTopics = [
  '🎭 جشنواره‌ها',
  '🎨 نمایشگاه‌ها',
  '🕌 مناسبت‌های مذهبی',
  '🎤 همایش‌ها',
  '🏛️ رویدادهای فرهنگی',
  '🎬 سینما و تئاتر',
  '📚 کتاب و ادبیات',
  '🎵 موسیقی',
  '🖼️ هنرهای تجسمی',
  '🌸 نوروز و یلدا',
];

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Hero Section - Modern gradient */}
      <section className="gradient-hero py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-white leading-tight">
            رویدادهای ایران
            <br />
            <span className="text-white/90">۱۴۰۴-۱۴۰۵</span>
          </h1>

          <p className="text-lg md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            کشف فرهنگ، هنر و جشن‌های اصیل ایرانی
          </p>

          <SearchBar />

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16">
            <StatsCard number="۲۵۰+" label="رویداد فعال" />
            <StatsCard number="۳۱" label="استان" />
            <StatsCard number="۱۵+" label="موضوع" />
            <StatsCard number="۱۰۰K+" label="بازدید ماهانه" />
          </div>
        </div>
      </section>

      <PersianDivider />

      {/* Featured Events */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 bg-gray-50">
        <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900">
            🎭 رویدادهای ویژه
          </h2>
          <Link href="/events">
            <button className="gradient-btn text-white px-6 py-3 rounded-lg font-bold shadow-lg">
              مشاهده همه ←
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <PersianDivider />

      {/* Popular Topics */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-12 text-center">
          🏛️ موضوعات محبوب
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {popularTopics.map((topic, index) => (
            <TagButton key={index}>{topic}</TagButton>
          ))}
        </div>
      </section>

      <PersianDivider />

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
        <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-3xl p-12 md:p-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
            رویداد خود را ثبت کنید
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
            سازمان‌دهندگان رویدادهای فرهنگی می‌توانند رویدادهای خود را به‌صورت رایگان
            در پلتفرم ما ثبت و به هزاران علاقه‌مند معرفی کنند.
          </p>
          <Link href="/submit-event">
            <button className="gradient-btn text-white px-8 py-4 rounded-lg text-lg font-bold shadow-xl hover:shadow-2xl">
              ثبت رویداد جدید +
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
