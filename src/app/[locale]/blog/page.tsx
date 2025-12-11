import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar } from 'lucide-react'
import { formatPersianDate } from '@/lib/date-utils'

export const metadata = {
  title: 'مجله و بلاگ | IranTour Guide',
  description: 'مقالات فرهنگی و گردشگری ایران'
}

export default async function BlogPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const posts = await prisma.post.findMany({
    where: {
      type: 'BLOG',
      isPublished: true
    },
    orderBy: { publishedAt: 'desc' },
    take: 20
  })

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">مجله و بلاگ</h1>
          <p className="text-xl text-gray-600">مقالات فرهنگی و گردشگری ایران</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-6">هنوز مقاله‌ای منتشر نشده است</p>
            <Link
              href={`/${locale}`}
              className="inline-block px-6 py-3 bg-[#A01C1C] text-white rounded-lg hover:bg-[#7a1515] transition-colors"
            >
              بازگشت به صفحه اصلی
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/${locale}/blog/${post.slug}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                {post.featuredImage && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-[#A01C1C] transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  )}
                  <div className="flex items-center justify-between">
                    {post.publishedAt && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {formatPersianDate(post.publishedAt)}
                      </div>
                    )}
                    <span className="text-[#A01C1C] text-sm font-medium hover:underline">
                      ادامه مطلب ←
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
