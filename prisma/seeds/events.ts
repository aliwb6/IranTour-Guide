import { PrismaClient } from '@prisma/client'

export async function seedEvents(prisma: PrismaClient) {
  console.log('🎉 Seeding events...')

  const eventsData: Array<{
    title: string
    slug: string
    style: string
    type: string
    fixedOrVariable: string
    city: string
    venue: string
    address: string
    dateRangeText: string
    startDate: Date
    endDate: Date
    shortDescription: string
    description: string
    opportunities: string | null
    challenges: string | null
    status: string
    categories: string[]
    latitude: number
    longitude: number
  }> = [
    {
      title: 'نوروز ۱۴۰۴ - جشن سال نو',
      slug: 'nowruz-1404',
      style: 'FESTIVAL',
      type: 'NATIONAL',
      fixedOrVariable: 'FIXED',
      city: 'تهران',
      venue: 'سراسر ایران',
      address: 'شهرهای مختلف ایران',
      dateRangeText: '۱ تا ۱۳ فروردین ۱۴۰۴',
      startDate: new Date('2025-03-21'),
      endDate: new Date('2025-04-02'),
      shortDescription: 'جشن سال نو ایرانی و شروع بهار',
      description: 'نوروز بزرگترین جشن ملی ایرانیان است که با شروع بهار و سال نو خورشیدی جشن گرفته می‌شود.',
      opportunities: 'فرصت عالی برای تجربه فرهنگ ایرانی',
      challenges: 'ازدحام جمعیت',
      status: 'APPROVED',
      categories: ['national-events', 'traditional-local'],
      latitude: 35.6892,
      longitude: 51.389,
    },
    {
      title: 'جشنواره فیلم فجر ۴۳',
      slug: 'fajr-film-festival-43',
      style: 'FESTIVAL',
      type: 'ARTISTIC',
      fixedOrVariable: 'VARIABLE',
      city: 'تهران',
      venue: 'پردیس‌های سینمایی',
      address: 'تهران',
      dateRangeText: '۱۵ تا ۲۵ بهمن',
      startDate: new Date('2025-02-03'),
      endDate: new Date('2025-02-13'),
      shortDescription: 'بزرگترین رویداد سینمایی ایران',
      description: 'جشنواره فیلم فجر مهم‌ترین رویداد سینمایی سالانه ایران است.',
      opportunities: 'تماشای فیلم‌های جدید',
      challenges: null,
      status: 'APPROVED',
      categories: ['cinema-film'],
      latitude: 35.6892,
      longitude: 51.389,
    },
  ]

  let createdCount = 0

  for (const eventData of eventsData) {
    const categories = await prisma.category.findMany({
      where: {
        slug: {
          in: eventData.categories,
        },
      },
    })

    await prisma.event.upsert({
      where: { slug: eventData.slug },
      update: {},
      create: {
        title: eventData.title,
        slug: eventData.slug,
        style: eventData.style as any,
        type: eventData.type as any,
        fixedOrVariable: eventData.fixedOrVariable as any,
        city: eventData.city,
        venue: eventData.venue,
        address: eventData.address,
        dateRangeText: eventData.dateRangeText,
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        shortDescription: eventData.shortDescription,
        description: eventData.description,
        opportunities: eventData.opportunities,
        challenges: eventData.challenges,
        status: eventData.status as any,
        latitude: eventData.latitude,
        longitude: eventData.longitude,
        approvedAt: new Date(),
        publishedAt: new Date(),
        categories: {
          create: categories.map((cat) => ({
            category: {
              connect: { id: cat.id },
            },
          })),
        },
      },
    })

    createdCount++
  }

  console.log(`✅ Created ${createdCount} events`)
}
