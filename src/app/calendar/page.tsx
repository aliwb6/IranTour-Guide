// src/app/calendar/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockEvents } from '@/lib/mock-data/events'

// تابع helper برای گرفتن رویدادهای یک روز خاص
function getEventsForDate(date: Date) {
  return mockEvents.filter((event) => {
    const eventDate = new Date(event.startDate)
    return (
      eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear()
    )
  })
}

// تابع helper برای گرفتن روزهای یک ماه
function getDaysInMonth(year: number, month: number) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const days = []

  // روزهای خالی اول ماه
  const firstDayOfWeek = (firstDay.getDay() + 1) % 7 // شنبه = 0
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null)
  }

  // روزهای ماه
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i))
  }

  return days
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const days = getDaysInMonth(year, month)

  const monthNames = [
    'ژانویه',
    'فوریه',
    'مارس',
    'آوریل',
    'مه',
    'ژوئن',
    'ژوئیه',
    'اوت',
    'سپتامبر',
    'اکتبر',
    'نوامبر',
    'دسامبر',
  ]

  const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const selectedDayEvents = selectedDate ? getEventsForDate(selectedDate) : []

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="kashi-star-pattern py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-red-900 mb-6">
            📅 تقویم رویدادها
          </h1>
          <p className="text-xl text-gray-700 font-bold">
            برنامه‌ریزی سفر خود را با تقویم جامع رویدادهای ایران آسان کنید
          </p>
        </div>
      </section>

      {/* محتوا */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* تقویم */}
          <div className="lg:col-span-2">
            <div className="kashi-card p-6">
              {/* Header تقویم */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={goToPreviousMonth}
                  className="px-4 py-2 rounded-xl border-2 border-red-900 text-red-900 font-black hover:bg-red-900 hover:text-yellow-200 transition"
                >
                  ← ماه قبل
                </button>
                <h2 className="text-2xl font-black text-red-900">
                  {monthNames[month]} {year}
                </h2>
                <button
                  onClick={goToNextMonth}
                  className="px-4 py-2 rounded-xl border-2 border-red-900 text-red-900 font-black hover:bg-red-900 hover:text-yellow-200 transition"
                >
                  ماه بعد →
                </button>
              </div>

              {/* نام روزها */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {weekDays.map((day) => (
                  <div key={day} className="text-center font-black text-red-900 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* روزهای ماه */}
              <div className="grid grid-cols-7 gap-2">
                {days.map((date, index) => {
                  if (!date) {
                    return <div key={index} />
                  }

                  const events = getEventsForDate(date)
                  const hasEvents = events.length > 0
                  const isSelected =
                    selectedDate &&
                    date.getDate() === selectedDate.getDate() &&
                    date.getMonth() === selectedDate.getMonth()

                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      className={`aspect-square rounded-xl border-2 transition ${
                        isSelected
                          ? 'border-red-900 bg-red-900 text-yellow-200'
                          : hasEvents
                            ? 'border-gold bg-gold/20 hover:bg-gold hover:text-white'
                            : 'border-gray-300 hover:border-gold'
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className="font-black">{date.getDate()}</span>
                        {hasEvents && (
                          <span className="text-xs font-bold mt-1">
                            {events.length} رویداد
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Sidebar - رویدادهای روز انتخابی */}
          <div className="lg:col-span-1">
            <div className="kashi-card p-6 sticky top-4">
              <h3 className="text-xl font-black text-red-900 mb-6">
                {selectedDate
                  ? `رویدادهای ${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]}`
                  : 'روزی را انتخاب کنید'}
              </h3>

              {selectedDate && selectedDayEvents.length === 0 && (
                <p className="text-center text-gray-600 font-bold py-8">
                  رویدادی برای این روز ثبت نشده است
                </p>
              )}

              {selectedDate && selectedDayEvents.length > 0 && (
                <div className="space-y-4">
                  {selectedDayEvents.map((event) => (
                    <Link
                      key={event.id}
                      href={`/events/${event.slug}`}
                      className="block p-4 rounded-xl bg-cream border-2 border-gold hover:border-red-900 transition"
                    >
                      <h4 className="font-black text-red-900 mb-2">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-700 font-bold">
                        📍 {event.city}
                      </p>
                      <p className="text-sm text-gray-700 font-bold">
                        🏷️ {event.type}
                      </p>
                    </Link>
                  ))}
                </div>
              )}

              {!selectedDate && (
                <p className="text-center text-gray-600 font-bold py-8">
                  روی یک روز کلیک کنید تا رویدادهای آن را ببینید
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
