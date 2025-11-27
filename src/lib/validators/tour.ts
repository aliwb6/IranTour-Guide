import { z } from 'zod';

export const createTourSchema = z.object({
  title: z.string().min(3, 'عنوان باید حداقل ۳ کاراکتر باشد'),
  description: z.string().min(10, 'توضیحات باید حداقل ۱۰ کاراکتر باشد'),
  price: z.number().min(0, 'قیمت باید مثبت باشد'),
  duration: z.number().min(1, 'مدت تور باید حداقل ۱ روز باشد'),
  maxCapacity: z.number().min(1, 'ظرفیت باید حداقل ۱ نفر باشد'),
  category: z.enum(['CULTURAL', 'NATURE', 'ADVENTURE', 'HISTORICAL', 'RELIGIOUS', 'FOOD']),
  destinations: z.array(z.string()).min(1, 'حداقل یک مقصد انتخاب کنید'),
  includes: z.array(z.string()).optional(),
  excludes: z.array(z.string()).optional(),
});

export const bookingSchema = z.object({
  tourId: z.string(),
  numberOfPeople: z.number().min(1, 'تعداد نفرات باید حداقل ۱ باشد'),
  startDate: z.string().or(z.date()),
  specialRequests: z.string().optional(),
});

export type CreateTourInput = z.infer<typeof createTourSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
