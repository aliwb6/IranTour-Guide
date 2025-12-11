'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, X, Eye } from 'lucide-react'
import type { Event, Organization } from '@prisma/client'

interface AdminEventsTableProps {
  events: (Event & { organization: Organization | null })[]
  locale: string
}

export default function AdminEventsTable({ events, locale }: AdminEventsTableProps) {
  const [loading, setLoading] = useState<string | null>(null)

  const handleApprove = async (eventId: string) => {
    if (!confirm('آیا از تأیید این رویداد اطمینان دارید؟')) return

    setLoading(eventId)
    try {
      const response = await fetch(`/api/admin/events/${eventId}/approve`, {
        method: 'POST'
      })

      if (!response.ok) throw new Error('Failed to approve')

      alert('رویداد تأیید شد')
      window.location.reload()
    } catch (error) {
      alert('خطا در تأیید رویداد')
    } finally {
      setLoading(null)
    }
  }

  const handleReject = async (eventId: string) => {
    if (!confirm('آیا از رد این رویداد اطمینان دارید؟')) return

    setLoading(eventId)
    try {
      const response = await fetch(`/api/admin/events/${eventId}/reject`, {
        method: 'POST'
      })

      if (!response.ok) throw new Error('Failed to reject')

      alert('رویداد رد شد')
      window.location.reload()
    } catch (error) {
      alert('خطا در رد رویداد')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">رویداد</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">سازمان</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">وضعیت</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {event.featuredImage && (
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                        <Image
                          src={event.featuredImage}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-500">{event.city}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700">{event.organization?.name || 'نامشخص'}</span>
                </td>
                <td className="px-6 py-4">
                  <Badge
                    variant={
                      event.status === 'APPROVED' ? 'success' :
                      event.status === 'PENDING' ? 'warning' :
                      'destructive'
                    }
                  >
                    {event.status === 'APPROVED' ? 'تأیید شده' :
                     event.status === 'PENDING' ? 'در انتظار' :
                     'رد شده'}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/${locale}/events/${event.slug}`}
                      target="_blank"
                    >
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>

                    {event.status === 'PENDING' && (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleApprove(event.id)}
                          disabled={loading === event.id}
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <Check className="w-4 h-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleReject(event.id)}
                          disabled={loading === event.id}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
