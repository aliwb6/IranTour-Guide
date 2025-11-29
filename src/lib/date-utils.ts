// @ts-ignore - moment-jalaali doesn't have TypeScript definitions
import moment from 'moment-jalaali';

// Configure moment-jalaali
moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

/**
 * تبدیل تاریخ میلادی به شمسی
 * @param date - تاریخ میلادی (Date object یا string)
 * @returns تاریخ شمسی به صورت رشته
 */
export function toJalaali(date: Date | string): string {
  return moment(date).format('jYYYY/jMM/jDD');
}

/**
 * تبدیل تاریخ شمسی به میلادی
 * @param jalaaliDate - تاریخ شمسی (مثل '1404/01/01')
 * @returns تاریخ میلادی
 */
export function toGregorian(jalaaliDate: string): Date {
  return moment(jalaaliDate, 'jYYYY/jMM/jDD').toDate();
}

/**
 * فرمت کردن تاریخ به صورت خوانا فارسی
 * @param date - تاریخ
 * @param format - فرمت دلخواه (پیش‌فرض: 'jD jMMMM jYYYY')
 * @returns تاریخ فرمت شده فارسی
 */
export function formatJalaali(date: Date | string, format = 'jD jMMMM jYYYY'): string {
  return moment(date).format(format);
}

/**
 * محاسبه روزهای باقی‌مانده تا یک تاریخ
 * @param targetDate - تاریخ هدف
 * @returns تعداد روزهای باقی‌مانده
 */
export function getDaysUntil(targetDate: Date | string): number {
  const now = moment();
  const target = moment(targetDate);
  return target.diff(now, 'days');
}

/**
 * فرمت محدوده تاریخی به فارسی
 * @param startDate - تاریخ شروع
 * @param endDate - تاریخ پایان (اختیاری)
 * @returns رشته فرمت شده مثل "۱۵ تا ۲۰ آبان ۱۴۰۴"
 */
export function formatDateRange(startDate: Date | string, endDate?: Date | string): string {
  const start = moment(startDate);

  if (!endDate) {
    return start.format('jD jMMMM jYYYY');
  }

  const end = moment(endDate);

  // اگر در یک ماه باشند
  if (start.jMonth() === end.jMonth() && start.jYear() === end.jYear()) {
    return `${start.format('jD')} تا ${end.format('jD jMMMM jYYYY')}`;
  }

  // اگر در یک سال ولی ماه متفاوت
  if (start.jYear() === end.jYear()) {
    return `${start.format('jD jMMMM')} تا ${end.format('jD jMMMM jYYYY')}`;
  }

  // اگر سال‌های مختلف
  return `${start.format('jD jMMMM jYYYY')} تا ${end.format('jD jMMMM jYYYY')}`;
}

/**
 * دریافت نام روز هفته به فارسی
 * @param date - تاریخ
 * @returns نام روز هفته
 */
export function getPersianDayName(date: Date | string): string {
  return moment(date).format('dddd');
}

/**
 * دریافت نام ماه به فارسی
 * @param date - تاریخ
 * @returns نام ماه
 */
export function getPersianMonthName(date: Date | string): string {
  return moment(date).format('jMMMM');
}

/**
 * چک کردن اینکه آیا رویداد فعال است یا نه
 * @param startDate - تاریخ شروع
 * @param endDate - تاریخ پایان
 * @returns true اگر رویداد فعال باشد
 */
export function isEventActive(startDate: Date | string, endDate: Date | string): boolean {
  const now = moment();
  const start = moment(startDate);
  const end = moment(endDate);

  return now.isBetween(start, end, 'day', '[]');
}

/**
 * چک کردن اینکه آیا رویداد آینده است یا نه
 * @param startDate - تاریخ شروع
 * @returns true اگر رویداد آینده باشد
 */
export function isEventUpcoming(startDate: Date | string): boolean {
  const now = moment();
  const start = moment(startDate);

  return start.isAfter(now);
}

/**
 * چک کردن اینکه آیا رویداد گذشته است یا نه
 * @param endDate - تاریخ پایان
 * @returns true اگر رویداد گذشته باشد
 */
export function isEventPast(endDate: Date | string): boolean {
  const now = moment();
  const end = moment(endDate);

  return end.isBefore(now);
}

/**
 * دریافت متن وضعیت رویداد (در حال برگزاری، آینده، گذشته)
 * @param startDate - تاریخ شروع
 * @param endDate - تاریخ پایان
 * @returns متن وضعیت
 */
export function getEventStatus(startDate: Date | string, endDate: Date | string): string {
  if (isEventActive(startDate, endDate)) {
    return 'در حال برگزاری';
  }
  if (isEventUpcoming(startDate)) {
    const days = getDaysUntil(startDate);
    if (days === 0) return 'امروز';
    if (days === 1) return 'فردا';
    return `${convertToPersianNumbers(days)} روز دیگر`;
  }
  return 'پایان یافته';
}

/**
 * تبدیل اعداد انگلیسی به فارسی
 * @param num - عدد یا رشته
 * @returns عدد فارسی
 */
export function convertToPersianNumbers(num: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
}

/**
 * تبدیل اعداد فارسی به انگلیسی
 * @param str - رشته با اعداد فارسی
 * @returns رشته با اعداد انگلیسی
 */
export function convertToEnglishNumbers(str: string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[۰-۹]/g, (digit) => persianDigits.indexOf(digit).toString());
}

/**
 * دریافت تاریخ امروز به شمسی
 * @returns تاریخ امروز
 */
export function getTodayJalaali(): string {
  return moment().format('jYYYY/jMM/jDD');
}

/**
 * فرمت نسبی زمان (مثل "۲ روز پیش")
 * @param date - تاریخ
 * @returns زمان نسبی
 */
export function getRelativeTime(date: Date | string): string {
  return moment(date).fromNow();
}
