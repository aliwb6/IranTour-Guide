import React from 'react'
import { LucideIcon } from 'lucide-react'

interface KPICardProps {
  label: string
  value: number | string
  change?: string
  icon: LucideIcon
  color?: 'blue' | 'green' | 'purple' | 'orange'
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600 border-blue-200',
  green: 'bg-green-50 text-green-600 border-green-200',
  purple: 'bg-purple-50 text-purple-600 border-purple-200',
  orange: 'bg-orange-50 text-orange-600 border-orange-200',
}

const iconBgClasses = {
  blue: 'bg-blue-100',
  green: 'bg-green-100',
  purple: 'bg-purple-100',
  orange: 'bg-orange-100',
}

export const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  change,
  icon: Icon,
  color = 'blue',
}) => {
  const isPositive = change?.startsWith('+')

  return (
    <div
      className={`rounded-xl border-2 p-6 ${colorClasses[color]} transition-all hover:shadow-lg`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
          <p className="text-3xl font-bold mb-2" dir="ltr">
            {typeof value === 'number' ? value.toLocaleString('fa-IR') : value}
          </p>
          {change && (
            <p className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconBgClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}
