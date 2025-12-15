import { PrismaClient, EventStyle, EventType, FixedVariable, EventStatus } from '@prisma/client'

const prisma = new PrismaClient()

export const sampleEvents = [
  {
    title: 'جشنواره فیلم فجر ۱۴۰۴',
    slug: 'jashnvareh-film-fajr-1404',
    style: EventStyle.FESTIVAL,
    type: EventType.ARTISTIC,
    fixedOrVariable: FixedVariable.FIXED,
    country: 'Iran',
    city: 'تهران',
    venue: 'پردیس ملت',
    address: 'تهران، خیابان ولیعصر، پردیس سینمایی ملت',
    latitude: 35.7219,
    longitude: 51.4231,
    dateRangeText: '17 تا 25 بهمن 1404',
    startDate: new Date('2026-02-06'),
    endDate: new Date('2026-02-14'),
    registrationDeadline: new Date('2026-02-01'),
    durationText: '9 روز',
    basePrice: 50000,
    currency: 'IRR',
    maxCapacity: 500,
    availableSpots: 500,
    isBookable: true,
    shortDescription:
      'بزرگترین رویداد سینمایی کشور با حضور فیلم‌سازان برتر',
    description: `درباره جشنواره
جشنواره فیلم فجر بزرگترین و مهم‌ترین رویداد سینمایی ایران است که هر ساله در بهمن ماه برگزار می‌شود.

ویژگی‌های جشنواره:
- نمایش بیش از 100 فیلم بلند و کوتاه
- حضور کارگردانان و بازیگران مطرح
- مراسم اختتامیه با اهدای جوایز
- نشست‌های تخصصی سینمایی`,
    opportunities: `- دیدن فیلم‌های جدید قبل از اکران عمومی
- فرصت گفتگو با فیلمسازان
- شرکت در نشست‌های تخصصی
- دریافت گواهی شرکت`,
    challenges: `- شلوغی پردیس‌ها در ساعات اوج
- محدودیت ظرفیت برخی فیلم‌ها
- نیاز به خرید بلیط زودهنگام`,
    featuredImage: '/images/events/fajr-festival.jpg',
    images: [
      '/images/events/fajr-1.jpg',
      '/images/events/fajr-2.jpg',
      '/images/events/fajr-3.jpg',
    ],
    organizerName: 'دبیرخانه جشنواره فیلم فجر',
    organizerPhone: '02188754321',
    organizerEmail: 'info@fajrfestival.ir',
    website: 'https://fajrfestival.ir',
    status: EventStatus.APPROVED,
    keywords: ['سینما', 'فیلم', 'جشنواره', 'فجر', 'تهران'],
    publishedAt: new Date(),
  },
  {
    title: 'نمایشگاه کتاب تهران ۱۴۰۴',
    slug: 'namayeshgah-ketab-tehran-1404',
    style: EventStyle.EXHIBITION,
    type: EventType.ARTISTIC,
    fixedOrVariable: FixedVariable.FIXED,
    country: 'Iran',
    city: 'تهران',
    venue: 'مصلی امام خمینی',
    address: 'تهران، نیایش، مصلی امام خمینی',
    latitude: 35.7355,
    longitude: 51.2939,
    dateRangeText: '1 تا 14 اردیبهشت 1404',
    startDate: new Date('2025-04-21'),
    endDate: new Date('2025-05-04'),
    registrationDeadline: new Date('2025-04-15'),
    durationText: '14 روز',
    basePrice: 0, // رایگان
    currency: 'IRR',
    maxCapacity: 10000,
    availableSpots: 10000,
    isBookable: true,
    shortDescription: 'بزرگترین رویداد فرهنگی و نشر کتاب در ایران',
    description: `نمایشگاه بین‌المللی کتاب تهران
سی و هفتمین دوره نمایشگاه بین‌المللی کتاب تهران با حضور بیش از ۳۰۰۰ ناشر از سراسر کشور و جهان برگزار می‌شود.

امکانات و فعالیت‌ها:
- نمایش و فروش میلیون‌ها عنوان کتاب
- نشست‌ها و رونمایی کتاب
- برنامه‌های ویژه کودکان و نوجوانان
- کارگاه‌های آموزشی`,
    opportunities: `- خرید کتاب با تخفیف
- دیدار با نویسندگان محبوب
- شرکت در نشست‌های ادبی
- کشف ناشران و کتاب‌های جدید`,
    challenges: `- شلوغی در ساعات پیک
- حجم بالای بازدیدکنندگان
- زمان‌بر بودن بازدید کامل`,
    featuredImage: '/images/events/book-fair.jpg',
    images: [
      '/images/events/book-1.jpg',
      '/images/events/book-2.jpg',
    ],
    organizerName: 'وزارت فرهنگ و ارشاد اسلامی',
    organizerPhone: '02166701234',
    organizerEmail: 'info@tibf.ir',
    website: 'https://tibf.ir',
    status: EventStatus.APPROVED,
    keywords: ['کتاب', 'نمایشگاه', 'فرهنگ', 'نشر', 'تهران'],
    publishedAt: new Date(),
  },
  {
    title: 'تور طبیعت‌گردی جنگل‌های شمال',
    slug: 'tour-jangal-shomal',
    style: EventStyle.TOURISM,
    type: EventType.TOURISM,
    fixedOrVariable: FixedVariable.VARIABLE,
    country: 'Iran',
    city: 'رامسر',
    venue: 'جنگل‌های ابر',
    address: 'استان مازندران، رامسر، جاده چالوس',
    latitude: 36.9037,
    longitude: 50.6585,
    dateRangeText: 'هر هفته پنج‌شنبه و جمعه',
    startDate: new Date('2025-03-21'),
    endDate: new Date('2025-06-21'),
    registrationDeadline: new Date('2025-06-15'),
    durationText: '2 روز و 1 شب',
    basePrice: 1200000,
    currency: 'IRR',
    maxCapacity: 20,
    availableSpots: 15,
    isBookable: true,
    shortDescription: 'تجربه یک سفر به یاد ماندنی در دل جنگل‌های شمال',
    description: `تور طبیعت‌گردی جنگل‌های شمال
یک تجربه فراموش‌نشدنی در دل جنگل‌های انبوه و سرسبز شمال ایران. این تور شامل پیاده‌روی در مسیرهای جنگلی، بازدید از آبشارها و اقامت در کلبه‌های چوبی است.

برنامه سفر:
روز اول: حرکت از تهران، ورود به رامسر، پیاده‌روی در جنگل
روز دوم: صبحانه، بازدید از آبشار، بازگشت به تهران

تسهیلات:
- اتوبوس VIP
- راهنمای حرفه‌ای
- بیمه مسافرتی
- 3 وعده غذا`,
    opportunities: `- تجربه هوای پاک جنگل
- عکس‌برداری از مناظر طبیعی
- آشنایی با گیاهان بومی
- فرصت استراحت از شلوغی شهر`,
    challenges: `- نیاز به آمادگی جسمانی متوسط
- احتمال بارندگی
- مسیرهای ناهموار`,
    featuredImage: '/images/events/forest-tour.jpg',
    images: [
      '/images/events/forest-1.jpg',
      '/images/events/forest-2.jpg',
      '/images/events/forest-3.jpg',
    ],
    organizerName: 'آژانس مسافرتی سفرهای سبز',
    organizerPhone: '09123456789',
    organizerEmail: 'info@greentrips.ir',
    website: 'https://greentrips.ir',
    status: EventStatus.APPROVED,
    keywords: ['طبیعت‌گردی', 'تور', 'جنگل', 'شمال', 'رامسر'],
    publishedAt: new Date(),
  },
  {
    title: 'همایش ملی نوآوری و فناوری',
    slug: 'hamayesh-noavari-fanavari',
    style: EventStyle.CONFERENCE,
    type: EventType.SCIENTIFIC,
    fixedOrVariable: FixedVariable.FIXED,
    country: 'Iran',
    city: 'تهران',
    venue: 'مرکز همایش‌های برج میلاد',
    address: 'تهران، همت غربی، برج میلاد',
    latitude: 35.7447,
    longitude: 51.3753,
    dateRangeText: '15 و 16 خرداد 1404',
    startDate: new Date('2025-06-05'),
    endDate: new Date('2025-06-06'),
    registrationDeadline: new Date('2025-05-30'),
    durationText: '2 روز',
    basePrice: 250000,
    currency: 'IRR',
    maxCapacity: 300,
    availableSpots: 250,
    isBookable: true,
    shortDescription:
      'همایش ملی نوآوری و فناوری با حضور متخصصان برتر',
    description: `همایش ملی نوآوری و فناوری
این همایش با هدف گردهمایی فعالان حوزه فناوری، استارتاپ‌ها، سرمایه‌گذاران و دانشجویان برگزار می‌شود.

محورهای همایش:
- هوش مصنوعی و یادگیری ماشین
- بلاکچین و رمزارزها
- اینترنت اشیا
- امنیت سایبری
- کسب‌وکار دیجیتال

سخنرانان:
- دکتر احمد محمدی (متخصص AI)
- مهندس سارا رضایی (CEO استارتاپ موفق)
- و بسیاری دیگر...`,
    opportunities: `- آشنایی با آخرین دستاوردهای فناوری
- فرصت نتورکینگ
- دریافت گواهی معتبر
- شرکت در کارگاه‌های عملی`,
    challenges: `- حجم بالای اطلاعات ارائه شده
- نیاز به پیش‌زمینه فنی
- زمان محدود برای تعامل`,
    featuredImage: '/images/events/tech-conference.jpg',
    images: [
      '/images/events/tech-1.jpg',
      '/images/events/tech-2.jpg',
    ],
    organizerName: 'انجمن نوآوری ایران',
    organizerPhone: '02144556677',
    organizerEmail: 'info@innoconf.ir',
    website: 'https://innoconf.ir',
    status: EventStatus.APPROVED,
    keywords: ['همایش', 'فناوری', 'نوآوری', 'تکنولوژی', 'استارتاپ'],
    publishedAt: new Date(),
  },
  {
    title: 'جشنواره موسیقی فجر ۱۴۰۴',
    slug: 'jashnvareh-musiqi-fajr-1404',
    style: EventStyle.FESTIVAL,
    type: EventType.ARTISTIC,
    fixedOrVariable: FixedVariable.FIXED,
    country: 'Iran',
    city: 'تهران',
    venue: 'تالار وحدت',
    address: 'تهران، خیابان حافظ، تالار وحدت',
    latitude: 35.6949,
    longitude: 51.4055,
    dateRangeText: '20 تا 28 بهمن 1404',
    startDate: new Date('2026-02-09'),
    endDate: new Date('2026-02-17'),
    registrationDeadline: new Date('2026-02-05'),
    durationText: '9 روز',
    basePrice: 75000,
    currency: 'IRR',
    maxCapacity: 800,
    availableSpots: 700,
    isBookable: true,
    shortDescription: 'جشنواره موسیقی فجر با اجرای هنرمندان برجسته',
    description: `جشنواره موسیقی فجر
سی و نهمین دوره جشنواره موسیقی فجر با اجرای بیش از 50 گروه و خواننده برتر موسیقی ایرانی برگزار می‌شود.

سبک‌های موسیقی:
- موسیقی سنتی ایرانی
- موسیقی پاپ
- موسیقی کلاسیک
- موسیقی محلی

ویژگی‌ها:
- کنسرت‌های زنده
- کارگاه‌های آموزشی موسیقی
- نمایشگاه سازهای موسیقی
- مراسم اختتامیه با اهدای جوایز`,
    opportunities: `- تماشای اجراهای زنده
- آشنایی با سازهای موسیقی
- شرکت در کارگاه‌های آموزشی
- دیدار با هنرمندان`,
    challenges: `- تقاضای بالا برای بلیط
- محدودیت ظرفیت سالن
- زمان‌بندی متراکم برنامه‌ها`,
    featuredImage: '/images/events/music-festival.jpg',
    images: [
      '/images/events/music-1.jpg',
      '/images/events/music-2.jpg',
    ],
    organizerName: 'اداره کل موسیقی',
    organizerPhone: '02166987654',
    organizerEmail: 'info@fajrmusic.ir',
    website: 'https://fajrmusic.ir',
    status: EventStatus.APPROVED,
    keywords: ['موسیقی', 'جشنواره', 'کنسرت', 'فجر', 'هنر'],
    publishedAt: new Date(),
  },
]

async function seedEvents() {
  console.log('🌱 Seeding events...')

  for (const eventData of sampleEvents) {
    await prisma.event.upsert({
      where: { slug: eventData.slug },
      update: eventData,
      create: eventData,
    })
    console.log(`✓ Created/Updated: ${eventData.title}`)
  }

  console.log('✅ Events seeded successfully')
}

export default seedEvents
