'use client'

import { useState, useMemo } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

const PERSIAN_MONTHS = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
]

const PERSIAN_WEEKDAYS = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']

interface EventCalendarProps {
  events?: { date: string; count: number; title?: string }[]
  onDateSelect?: (date: string) => void
  selectedDate?: string | null
}

export function EventCalendar({ events = [], onDateSelect, selectedDate }: EventCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(8)
  const [currentYear, setCurrentYear] = useState(1404)

  const daysInMonth = currentMonth <= 6 ? 31 : currentMonth <= 11 ? 30 : 29
  const firstDayOffset = (currentMonth + currentYear) % 7

  const days = useMemo(() => {
    const result: (number | null)[] = []
    for (let i = 0; i < firstDayOffset; i++) result.push(null)
    for (let i = 1; i <= daysInMonth; i++) result.push(i)
    return result
  }, [daysInMonth, firstDayOffset])

  const getEventCount = (day: number) => {
    const dateStr = `${currentYear}/${String(currentMonth).padStart(2, '0')}/${String(day).padStart(2, '0')}`
    const event = events.find((e) => e.date === dateStr)
    return event?.count || 0
  }

  const goToPrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={goToNextMonth} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="font-bold text-gray-900">
          {PERSIAN_MONTHS[currentMonth - 1]} {currentYear}
        </h3>
        <button onClick={goToPrevMonth} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {PERSIAN_WEEKDAYS.map((day) => (
          <div key={day} className="text-center text-xs font-bold text-gray-500 py-2">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="aspect-square" />
          }

          const eventCount = getEventCount(day)
          const dateStr = `${currentYear}/${String(currentMonth).padStart(2, '0')}/${String(day).padStart(2, '0')}`
          const isSelected = selectedDate === dateStr

          return (
            <button
              key={`day-${day}`}
              onClick={() => onDateSelect?.(dateStr)}
              className={cn(
                'aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-colors relative',
                isSelected
                  ? 'bg-amber-500 text-white'
                  : eventCount > 0
                    ? 'bg-amber-50 hover:bg-amber-100 text-gray-900'
                    : 'hover:bg-gray-50 text-gray-700'
              )}
            >
              <span className="font-medium">{day}</span>
              {eventCount > 0 && (
                <span className={cn(
                  'w-1.5 h-1.5 rounded-full absolute bottom-1',
                  isSelected ? 'bg-white' : 'bg-amber-500'
                )} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
