import React from 'react'
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface QuickAction {
  label: string
  href: string
  icon: LucideIcon
  color: 'primary' | 'secondary' | 'accent'
}

interface QuickActionsProps {
  actions: QuickAction[]
}

const colorClasses = {
  primary: 'bg-gradient-to-br from-[#A01C1C] to-[#7a1515] hover:from-[#7a1515] hover:to-[#A01C1C]',
  secondary:
    'bg-gradient-to-br from-[#D4AF37] to-[#b8951f] hover:from-[#b8951f] hover:to-[#D4AF37]',
  accent:
    'bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-600',
}

export const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon
        return (
          <Link
            key={index}
            href={action.href}
            className={`${colorClasses[action.color]} text-white rounded-xl p-6 flex items-center gap-4 transition-all transform hover:scale-105 hover:shadow-xl`}
          >
            <div className="p-3 bg-white/20 rounded-lg">
              <Icon className="w-6 h-6" />
            </div>
            <span className="text-lg font-bold">{action.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
