import { PrismaClient } from '@prisma/client'

// تعریف global type برای Prisma
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// ساخت Prisma Client با تنظیمات بهینه
const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  })
}

// استفاده از Singleton Pattern
export const prisma = globalThis.prisma ?? prismaClientSingleton()

// در محیط development، instance را نگه می‌داریم
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

// Export default هم برای راحتی
export default prisma