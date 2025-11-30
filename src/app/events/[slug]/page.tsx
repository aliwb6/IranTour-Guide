import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import prisma from '@/lib/db/prisma'
import Link from 'next/link'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const event = await prisma.event.findUnique({
    where: { slug },
  })

  if (!event) {
    return {
      title: 'رویداد یافت نشد',
    }
  }

  return {
    title: event.title + ' | IranTour Guide',
    description: event.shortDescription,
  }
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params
  const event = await prisma.event.findUnique({
    where: { slug },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
      organization: true,
    },
  })

  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link href="/events" className="text-primary hover:underline mb-6 inline-block">
          ← بازگشت به لیست رویدادها
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {event.featuredImage && (
              <div className="mb-6 rounded-lg overflow-hidden">
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">تصویر رویداد</p>
                </div>
              </div>
            )}

            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {event.categories.map((ec) => (
                <span
                  key={ec.categoryId}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {ec.category.icon} {ec.category.name}
                </span>
              ))}
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-semibold mb-3">درباره رویداد</h2>
              <p className="text-lg leading-relaxed whitespace-pre-wrap">{event.description}</p>
            </div>

            {event.opportunities && (
              <div className="mb-8 p-6 bg-green-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-green-800">فرصت‌ها</h3>
                <p className="text-green-700 whitespace-pre-wrap">{event.opportunities}</p>
              </div>
            )}

            {event.challenges && (
              <div className="mb-8 p-6 bg-yellow-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-yellow-800">چالش‌ها</h3>
                <p className="text-yellow-700 whitespace-pre-wrap">{event.challenges}</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-4 bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">اطلاعات رویداد</h3>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">زمان</div>
                  <div className="font-medium">{event.dateRangeText}</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">مکان</div>
                  <div className="font-medium">{event.city}</div>
                  <div className="text-sm">{event.venue}</div>
                </div>

                {event.address && (
                  <div>
                    <div className="text-sm text-muted-foreground">آدرس</div>
                    <div className="text-sm">{event.address}</div>
                  </div>
                )}

                <div>
                  <div className="text-sm text-muted-foreground">نوع</div>
                  <div className="font-medium">
                    {event.style === 'FESTIVAL' && 'جشنواره'}
                    {event.style === 'EXHIBITION' && 'نمایشگاه'}
                    {event.style === 'CONFERENCE' && 'کنفرانس'}
                    {event.style === 'RELIGIOUS' && 'مذهبی'}
                    {event.style === 'TOURISM' && 'گردشگری'}
                    {event.style === 'SPORTS' && 'ورزشی'}
                    {event.style === 'EDUCATIONAL' && 'آموزشی'}
                    {event.style === 'OTHER' && 'سایر'}
                  </div>
                </div>

                {event.website && (
                  <div>
                    <a
                      href={event.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      وب‌سایت رسمی
                    </a>
                  </div>
                )}

                {event.registrationUrl && (
                  <div>
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                    >
                      ثبت‌نام
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
