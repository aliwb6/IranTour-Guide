import moment from 'moment-jalaali'

export function toJalali(date: Date): string {
  return moment(date).format('jYYYY/jMM/jDD')
}

export function toGregorian(jalaliDate: string): Date {
  return moment(jalaliDate, 'jYYYY/jMM/jDD').toDate()
}

export function formatJalaliDate(date: Date, format: string = 'jYYYY/jMM/jDD'): string {
  return moment(date).format(format)
}