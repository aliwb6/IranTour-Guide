import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { formatPersianDate } from '@/lib/date-utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = await prisma.post.findUnique({
    where: { slug },
  })

  if (!post) return {}

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  const post = await prisma.post.findUnique({
    where: { slug },
  })

  if (!post || !post.isPublished) {
    notFound()
  }

  // Increment view count
  await prisma.post.update({
    where: { id: post.id },
    data: { viewCount: { increment: 1 } },
  })

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-[#A01C1C] hover:underline mb-8"
        >
          <ArrowRight className="w-4 h-4" />
          بازگشت به مجله
        </Link>

        <article className="bg-white rounded-xl shadow-md overflow-hidden">
          {post.featuredImage && (
            <div className="relative h-96 w-full">
              <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
            </div>
          )}

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

            {post.publishedAt && (
              <div className="flex items-center gap-2 text-gray-500 mb-8">
                <Calendar className="w-5 h-5" />
                {formatPersianDate(post.publishedAt)}
              </div>
            )}

            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
            />
          </div>
        </article>
      </div>
    </div>
  )
}
