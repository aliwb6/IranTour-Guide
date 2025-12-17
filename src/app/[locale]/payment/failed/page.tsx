'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PaymentFailedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-card rounded-2xl shadow-2xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6"
        >
          <XCircle className="w-12 h-12 text-red-600" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-foreground mb-4"
        >
          پرداخت ناموفق!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground mb-8"
        >
          متأسفانه پرداخت شما با خطا مواجه شد. لطفاً دوباره تلاش کنید.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          {bookingId && (
            <Button
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => router.push(`/payment?bookingId=${bookingId}`)}
            >
              <RefreshCw className="w-4 h-4 ml-2" />
              تلاش مجدد
            </Button>
          )}

          {bookingId && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push(`/bookings/${bookingId}`)}
            >
              مشاهده جزئیات رزرو
            </Button>
          )}

          <Button
            variant="ghost"
            className="w-full"
            onClick={() => router.push('/')}
          >
            <ArrowLeft className="w-4 h-4 ml-2" />
            بازگشت به صفحه اصلی
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
