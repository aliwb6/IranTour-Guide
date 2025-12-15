export const appConfig = {
  name: 'IranTour Guide',
  description: 'راهنمای سفر به ایران',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  locale: {
    default: 'fa',
    supported: ['fa', 'en'],
  },
  features: {
    enableAiChat: true,
    enablePayment: true,
    enableReviews: true,
    enableBooking: true,
  },
} as const

export const apiConfig = {
  baseUrl: '/api',
  timeout: 30000,
  retries: 3,
} as const

export const uploadConfig = {
  maxSize: parseInt(process.env.UPLOAD_MAX_SIZE || '5242880'), // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  uploadDir: 'public/uploads',
} as const
