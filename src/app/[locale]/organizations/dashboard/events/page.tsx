'use client'

import React, { useState, useEffect } from 'react'
import { EventsTable, EventRow } from '@/components/dashboard/EventsTable'
import { Filter } from 'lucide-react'

export default function EventsManagementPage() {
  const [events, setEvents] = useState<EventRow[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>(
    'ALL'
  )

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      // For now, this is a placeholder - will be replaced with actual API call
      setLoading(false)
      // In a real implementation:
      // const response = await fetch('/api/organizations/events')
      // const data = await response.json()
      // setEvents(data)
    } catch (error) {
      console.error('Error fetching events:', error)
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این رویداد اطمینان دارید؟')) {
      return
    }

    try {
      // Placeholder for API call
      // await fetch(`/api/organizations/events/${id}`, { method: 'DELETE' })
      setEvents(events.filter((e) => e.id !== id))
      alert('رویداد با موفقیت حذف شد')
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('خطا در حذف رویداد')
    }
  }

  const filteredEvents =
    statusFilter === 'ALL' ? events : events.filter((e) => e.status === statusFilter)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A01C1C] mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">مدیریت رویدادها</h1>
        <p className="text-gray-600">مشاهده و مدیریت تمام رویدادهای ثبت شده</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">فیلتر بر اساس وضعیت:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'ALL', label: 'همه' },
              { value: 'PENDING', label: 'در انتظار' },
              { value: 'APPROVED', label: 'تأیید شده' },
              { value: 'REJECTED', label: 'رد شده' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setStatusFilter(option.value as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === option.value
                    ? 'bg-[#A01C1C] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Table */}
      <EventsTable data={filteredEvents} onDelete={handleDelete} />

      {/* Empty State */}
      {filteredEvents.length === 0 && !loading && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {statusFilter === 'ALL'
                ? 'هنوز رویدادی ثبت نشده است'
                : 'رویدادی با این وضعیت یافت نشد'}
            </h3>
            <p className="text-gray-600 mb-6">
              {statusFilter === 'ALL'
                ? 'برای شروع، اولین رویداد خود را ثبت کنید'
                : 'می‌توانید فیلتر را تغییر دهید یا رویداد جدید اضافه کنید'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
