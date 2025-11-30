import { Metadata } from 'next'
import prisma from '@/lib/db/prisma'
import { EventCard } from '@/components/events/EventCard'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'خانه | IranTour Guide',
  description: 'کشف و تجربه بهترین رویدادهای فرهنگی، مذهبی، هنری و گردشگری ایران',
}

export default async function HomePage() {
  // Fetch featured events
  const featuredEvents = await prisma.event.findMany({
    where: {
      status: 'APPROVED',
    },
    take: 6,
    orderBy: {
      startDate: 'asc',
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  })

  // Fetch categories
  const categories = await prisma.category.findMany({
    take: 8,
    orderBy: {
      name: 'asc',
    },
  })

  // Get stats
  const stats = {
    events: await prisma.event.count({ where: { status: 'APPROVED' } }),
    cities: await prisma.city.count(),
    categories: await prisma.category.count(),
  }
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            رویدادهای ایران ۲۰۲۵–۲۰۲۶
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            کشف و تجربه فرهنگ، هنر و جشن‌های ایران
          </p>
          
          {/* Search Bar */}
          <div className="w-full max-w-2xl bg-white rounded-lg p-2 shadow-lg">
            <input
              type="text"
              placeholder="جستجوی رویداد، شهر یا موضوع..."
              className="w-full px-4 py-3 text-gray-900 rounded-md focus:outline-none"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12 w-full max-w-3xl">
            <div className="text-center">
              <div className="text-4xl font-bold">{stats.events}+</div>
              <div className="text-sm mt-2">رویداد ثبت شده</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{stats.cities}+</div>
              <div className="text-sm mt-2">شهر</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{stats.categories}+</div>
              <div className="text-sm mt-2">موضوع</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">رویدادهای ویژه</h2>
          <Link href="/events" className="text-primary hover:underline">
            مشاهده همه →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">دسته‌بندی‌ها</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/events?category=${category.slug}`}
                className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <div className="font-semibold">{category.name}</div>
                <div className="text-sm text-muted-foreground mt-1">{category.nameEn}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">رویداد خود را ثبت کنید</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          سازمان یا برگزارکننده رویداد هستید؟ رویداد خود را به صورت رایگان ثبت کنید
        </p>
        <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
          افزودن رویداد
        </button>
      </section>
    </div>
  )
}