import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${process.env.NEXT_PUBLIC_APP_URL || ''}${item.href}` : undefined,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="breadcrumb" className={cn('flex items-center gap-1 text-sm text-gray-500', className)}>
        {items.map((item, index) => (
          <span key={index} className="flex items-center gap-1">
            {index > 0 && <ChevronLeft className="w-3 h-3 text-gray-400" />}
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className="hover:text-amber-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={cn(index === items.length - 1 && 'text-gray-900 font-medium')}>
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  )
}
