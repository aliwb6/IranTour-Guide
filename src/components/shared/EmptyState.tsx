import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon?: LucideIcon | string
  title: string
  description?: string
  action?: {
    label: string
    href: string
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  const IconComponent = typeof icon === 'function' ? icon : null
  const iconText = typeof icon === 'string' ? icon : '📭'

  return (
    <div className="text-center py-12 px-4">
      <div className="max-w-md mx-auto">
        {IconComponent ? (
          <IconComponent className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        ) : (
          <div className="text-6xl mb-4">{iconText}</div>
        )}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        {description && <p className="text-gray-600 mb-6">{description}</p>}
        {action && (
          <Link
            href={action.href}
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition"
          >
            {action.label}
          </Link>
        )}
      </div>
    </div>
  )
}
