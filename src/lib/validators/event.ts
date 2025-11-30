import { z } from 'zod'
import { EMAIL_REGEX, PHONE_REGEX } from '@/constants/regex'

export const eventFormSchema = z.object({
  title: z.string().min(5, 'عنوان باید حداقل 5 کاراکتر باشد'),
  style: z.enum(['EXHIBITION', 'FESTIVAL', 'CONFERENCE', 'RELIGIOUS', 'TOURISM', 'SPORTS', 'EDUCATIONAL', 'OTHER']),
  type: z.enum(['NATIONAL', 'RELIGIOUS', 'ECONOMIC', 'ARTISTIC', 'SCIENTIFIC', 'TOURISM', 'SPORTS']),
  fixedOrVariable: z.enum(['FIXED', 'VARIABLE']),
  city: z.string().min(2, 'شهر الزامی است'),
  venue: z.string().min(3, 'محل برگزاری الزامی است'),
  address: z.string().optional(),
  dateRangeText: z.string().min(3, 'بازه زمانی الزامی است'),
  startDate: z.date(),
  endDate: z.date(),
  shortDescription: z.string().min(20).max(200, 'توضیح کوتاه باید بین 20 تا 200 کاراکتر باشد'),
  description: z.string().min(50, 'توضیحات باید حداقل 50 کاراکتر باشد'),
  featuredImage: z.string().url().optional(),
  organizerName: z.string().min(2, 'نام برگزارکننده الزامی است'),
  organizerEmail: z.string().regex(EMAIL_REGEX, 'ایمیل معتبر نیست'),
  organizerPhone: z.string().regex(PHONE_REGEX, 'شماره تلفن معتبر نیست'),
})

export type EventFormData = z.infer<typeof eventFormSchema>