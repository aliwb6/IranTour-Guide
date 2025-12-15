import { z } from 'zod'

// Payment Method Enum
export const paymentMethodEnum = z.enum([
  'ZARINPAL',
  'SAMAN',
  'MELLAT',
  'PASARGAD',
  'SADERAT',
  'PARSIAN',
  'CASH',
  'CARD',
  'OTHER',
])

// Initiate Payment Schema
export const initiatePaymentSchema = z.object({
  bookingId: z.string().min(1, 'شناسه رزرو الزامی است'),

  amount: z.number().min(1000, 'حداقل مبلغ پرداخت ۱۰۰۰ تومان است'),

  paymentMethod: paymentMethodEnum,

  returnUrl: z.string().url('آدرس بازگشت معتبر نیست'),

  description: z.string().max(200, 'توضیحات نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد').optional(),
})

export type InitiatePaymentSchema = z.infer<typeof initiatePaymentSchema>

// Verify Payment Schema
export const verifyPaymentSchema = z.object({
  authority: z.string().min(1, 'کد authority الزامی است'),

  status: z.string().min(1, 'وضعیت الزامی است'),

  transactionId: z.string().optional(),
})

export type VerifyPaymentSchema = z.infer<typeof verifyPaymentSchema>

// Refund Payment Schema
export const refundPaymentSchema = z.object({
  paymentId: z.string().min(1, 'شناسه پرداخت الزامی است'),

  amount: z.number().min(1000, 'حداقل مبلغ بازگشت ۱۰۰۰ تومان است'),

  reason: z
    .string()
    .min(10, 'دلیل بازگشت وجه باید حداقل ۱۰ کاراکتر باشد')
    .max(500, 'دلیل بازگشت وجه نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد'),
})

export type RefundPaymentSchema = z.infer<typeof refundPaymentSchema>

// Payment Callback Schema (for gateway callbacks)
export const paymentCallbackSchema = z.object({
  Authority: z.string().optional(),
  Status: z.string().optional(),
  RefID: z.string().optional(),
  ResCode: z.string().optional(),
  SaleReferenceId: z.string().optional(),
  Token: z.string().optional(),
  // Add more fields based on different gateways
})

export type PaymentCallbackSchema = z.infer<typeof paymentCallbackSchema>

// Payment Filter Schema
export const paymentFiltersSchema = z.object({
  bookingId: z.string().optional(),
  status: z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED']).optional(),
  paymentMethod: paymentMethodEnum.optional(),
  startDate: z.union([z.string(), z.date()]).optional(),
  endDate: z.union([z.string(), z.date()]).optional(),
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).max(100).optional().default(10),
})

export type PaymentFiltersSchema = z.infer<typeof paymentFiltersSchema>
