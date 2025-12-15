import { z } from 'zod'

export const organizationSchema = z.object({
  name: z
    .string()
    .min(2, 'نام سازمان باید حداقل ۲ کاراکتر باشد')
    .max(100, 'نام سازمان نباید بیشتر از ۱۰۰ کاراکتر باشد'),
  type: z.enum(
    [
      'MUSEUM',
      'UNIVERSITY',
      'NGO',
      'CULTURAL_CENTER',
      'TOUR_COMPANY',
      'LOCAL_ORGANIZATION',
      'GOVERNMENT',
      'PRIVATE',
      'OTHER',
    ],
    {
      message: 'نوع سازمان نامعتبر است',
    }
  ),
  description: z.string().max(1000, 'توضیحات نباید بیشتر از ۱۰۰۰ کاراکتر باشد').optional(),
  website: z.string().url('آدرس وب‌سایت نامعتبر است').optional().or(z.literal('')),
  email: z.string().email('ایمیل نامعتبر است').optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  instagram: z.string().optional(),
  telegram: z.string().optional(),
  twitter: z.string().optional(),
  facebook: z.string().optional(),
  linkedin: z.string().optional(),
})

export type OrganizationFormData = z.infer<typeof organizationSchema>

export const organizationTypeLabels: Record<string, string> = {
  MUSEUM: 'موزه',
  UNIVERSITY: 'دانشگاه',
  NGO: 'سازمان غیردولتی',
  CULTURAL_CENTER: 'مرکز فرهنگی',
  TOUR_COMPANY: 'شرکت گردشگری',
  LOCAL_ORGANIZATION: 'سازمان محلی',
  GOVERNMENT: 'دولتی',
  PRIVATE: 'خصوصی',
  OTHER: 'سایر',
}
