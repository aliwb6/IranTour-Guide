import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { EventCard } from '@/components/events/EventCard';
import { PersianDivider } from '@/components/shared/PersianDivider';
import { StatsCard } from '@/components/shared/StatsCard';
import { SearchBar } from '@/components/shared/SearchBar';
import { TagButton } from '@/components/shared/TagButton';
import Link from 'next/link';
import type { Event } from '@/types';

// Mock featured events data
const featuredEvents: Event[] = [
  {
    id: '1',
    title: 'جشنواره فرهنگی نوروز ۱۴۰۴',
    shortDescription:
      'بزرگترین جشنواره فرهنگی سال با حضور هنرمندان سراسر کشور، نمایش‌های سنتی و موسیقی اصیل ایرانی',
    featuredImage: '/images/events/nowruz-festival.jpg',
    style: 'FESTIVAL',
    type: 'جشنواره',
    city: 'تهران',
    province: 'تهران',
    dateRangeText: '۱ تا ۱۳ فروردین ۱۴۰۴',
    shamsiStartDate: '۱۴۰۴/۰۱/۰۱',
    shamsiEndDate: '۱۴۰۴/۰۱/۱۳',
    startDate: '2025-03-21',
    endDate: '2025-04-02',
    status: 'UPCOMING',
    tags: ['نوروز', 'فرهنگ', 'هنر'],
    isFeatured: true,
  },
  {
    id: '2',
    title: 'نمایشگاه صنایع دستی اصفهان',
    shortDescription:
      'نمایشگاه بین‌المللی صنایع دستی و هنرهای سنتی ایران با حضور هنرمندان برتر کشور',
    featuredImage: '/images/events/handicrafts-expo.jpg',
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
  {
    id: '3',
    title: 'همایش گردشگری پایدار',
    shortDescription:
      'همایش ملی گردشگری پایدار با محوریت توسعه اکوتوریسم و گردشگری مسئولانه در ایران',
    featuredImage: '/images/events/tourism-conference.jpg',
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
    id: '4',
    title: 'جشنواره موسیقی فجر',
    shortDescription:
      'سی و نهمین جشنواره موسیقی فجر با اجرای بهترین نوازندگان و خوانندگان موسیقی اصیل ایرانی',
    featuredImage: '/images/events/fajr-music.jpg',
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
    id: '5',
    title: 'نمایشگاه کتاب تهران',
    shortDescription:
      'سی و پنجمین نمایشگاه بین‌المللی کتاب تهران با حضور ناشران داخلی و خارجی',
    featuredImage: '/images/events/book-fair.jpg',
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
    id: '6',
    title: 'جشنواره فیلم فجر',
    shortDescription:
      'چهل و دومین جشنواره فیلم فجر با نمایش بهترین آثار سینمایی سال',
    featuredImage: '/images/events/fajr-film.jpg',
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

      {/* Hero Section */}
      <section className="deep-carpet-bg py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <div className="float">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-yellow-200 drop-shadow-2xl leading-tight">
              رویدادهای ایران
              <br />
              <span className="text-yellow-100">۱۴۰۴-۱۴۰۵</span>
            </h1>
          </div>

          <p className="text-lg md:text-2xl text-yellow-50 mb-12 drop-shadow-lg max-w-3xl mx-auto leading-relaxed font-bold">
            🌹 کشف فرهنگ، هنر و جشن‌های اصیل ایرانی 🌹
          </p>

          <SearchBar />

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-12 md:mt-16">
            <StatsCard number="۲۵۰+" label="رویداد فعال" />
            <StatsCard number="۳۱" label="استان" />
            <StatsCard number="۱۵+" label="موضوع" />
            <StatsCard number="۱۰۰K+" label="بازدید ماهانه" />
          </div>
        </div>
      </section>

      <PersianDivider />

      {/* Featured Events */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="flex justify-between items-center mb-8 md:mb-12 flex-wrap gap-4">
          <h2 className="text-3xl md:text-4xl font-black text-red-900">
            🎭 رویدادهای ویژه
          </h2>
          <Link href="/events">
            <button className="deep-persian-btn px-6 py-2.5 text-sm md:text-base">
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
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-black text-red-900 mb-8 md:mb-12 text-center">
          🏛️ موضوعات محبوب
        </h2>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {popularTopics.map((topic, index) => (
            <TagButton key={index}>{topic}</TagButton>
          ))}
        </div>
      </section>

      <PersianDivider />

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-red-900 mb-6">
          رویداد خود را ثبت کنید
        </h2>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          سازمان‌دهندگان رویدادهای فرهنگی می‌توانند رویدادهای خود را به‌صورت رایگان
          در پلتفرم ما ثبت و به هزاران علاقه‌مند معرفی کنند.
        </p>
        <Link href="/submit-event">
          <button className="deep-persian-btn px-8 py-4 text-base md:text-lg">
            ثبت رویداد جدید +
          </button>
        </Link>
      </section>

      <Footer />
    </>
  );
}
