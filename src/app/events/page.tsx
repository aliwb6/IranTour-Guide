import { Metadata } from 'next'
import prisma from '@/lib/db/prisma'
import { SimpleEventCard } from '@/components/events/EventCard'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'رویدادها | IranTour Guide',
  description: 'مشاهده همه رویدادهای فرهنگی، مذهبی، هنری و گردشگری ایران',
}

interface PageProps {
  searchParams: Promise<{
    city?: string
    category?: string
    type?: string
    page?: string
  }>
}

export default async function EventsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const page = parseInt(params.page || '1')
  const limit = 12
  const skip = (page - 1) * limit

  const where: any = {
    status: 'APPROVED',
  }

  if (params.city) {
    where.city = params.city
  }

  if (params.type) {
    where.type = params.type
  }

  if (params.category) {
    where.categories = {
      some: {
        category: {
          slug: params.category,
        },
      },
    }
  }

  const [events, total, cities, categories] = await Promise.all([
    prisma.event.findMany({
      where,
      skip,
      take: limit,
      orderBy: { startDate: 'asc' },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    }),
    prisma.event.count({ where }),
    prisma.city.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true, slug: true },
    }),
    prisma.category.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true, slug: true, icon: true },
    }),
  ])

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">رویدادهای ایران</h1>

        <div className="mb-8 p-6 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-4">فیلترها</h2>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">دسته‌بندی:</h3>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/events"
                className={!params.category ? 'px-3 py-1 rounded-full text-sm bg-primary text-white' : 'px-3 py-1 rounded-full text-sm bg-white hover:bg-gray-100'}
              >
                همه
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/events?category=${cat.slug}`}
                  className={params.category === cat.slug ? 'px-3 py-1 rounded-full text-sm bg-primary text-white' : 'px-3 py-1 rounded-full text-sm bg-white hover:bg-gray-100'}
                >
                  {cat.icon} {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">شهر:</h3>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/events"
                className={!params.city ? 'px-3 py-1 rounded-full text-sm bg-primary text-white' : 'px-3 py-1 rounded-full text-sm bg-white hover:bg-gray-100'}
              >
                همه شهرها
              </Link>
              {cities.slice(0, 10).map((city) => (
                <Link
                  key={city.id}
                  href={`/events?city=${city.name}`}
                  className={params.city === city.name ? 'px-3 py-1 rounded-full text-sm bg-primary text-white' : 'px-3 py-1 rounded-full text-sm bg-white hover:bg-gray-100'}
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4 text-muted-foreground">
          نمایش {events.length} رویداد از {total} رویداد
        </div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {events.map((event) => (
              <SimpleEventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">رویدادی یافت نشد</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/events?page=${p}`}
                className={p === page ? 'px-4 py-2 rounded bg-primary text-white' : 'px-4 py-2 rounded bg-white hover:bg-gray-100'}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
