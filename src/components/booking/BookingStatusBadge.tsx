'use client';

import { Clock, CheckCircle, XCircle, Calendar, AlertCircle } from 'lucide-react';
import type { BookingStatus } from '@/types/booking';

interface BookingStatusBadgeProps {
  status: BookingStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const statusConfig: Record<
  BookingStatus,
  {
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    icon: React.ElementType;
  }
> = {
  PENDING: {
    label: 'در انتظار پرداخت',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    icon: Clock,
  },
  CONFIRMED: {
    label: 'تایید شده',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    icon: CheckCircle,
  },
  CANCELLED: {
    label: 'لغو شده',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    icon: XCircle,
  },
  COMPLETED: {
    label: 'تکمیل شده',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    icon: Calendar,
  },
  EXPIRED: {
    label: 'منقضی شده',
    color: 'text-gray-700',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    icon: AlertCircle,
  },
};

export default function BookingStatusBadge({
  status,
  size = 'md',
  showIcon = true,
}: BookingStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full border font-medium
        ${config.color} ${config.bgColor} ${config.borderColor}
        ${sizeClasses[size]}
      `}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      {config.label}
    </span>
  );
}
