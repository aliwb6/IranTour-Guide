import moment from 'moment-jalaali'

export function formatPersianDate(date: Date | string): string {
  return moment(date).format('jYYYY/jMM/jDD')
}

export function formatGregorianDate(date: Date | string): string {
  return moment(date).format('YYYY-MM-DD')
}

export function parseJalaliDate(dateString: string): Date | null {
  const parsed = moment(dateString, 'jYYYY-jMM-jDD', true)
  if (!parsed.isValid()) {
    return null
  }
  return parsed.toDate()
}

export function formatPersianDateTime(date: Date | string): string {
  return moment(date).format('jYYYY/jMM/jDD HH:mm')
}

export function formatRelativeTime(date: Date | string): string {
  const momentDate = moment(date)
  const now = moment()
  const diff = now.diff(momentDate, 'seconds')

  if (diff < 60) {
    return 'همین الان'
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60)
    return `${minutes} دقیقه پیش`
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600)
    return `${hours} ساعت پیش`
  } else if (diff < 604800) {
    const days = Math.floor(diff / 86400)
    return `${days} روز پیش`
  } else {
    return formatPersianDate(date)
  }
}

export function getPersianMonthName(month: number): string {
  const months = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ]
  return months[month - 1] || ''
}

export function getPersianDayName(day: number): string {
  const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه']
  return days[day] || ''
}
