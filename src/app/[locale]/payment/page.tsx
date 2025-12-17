'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState(3);

  if (!bookingId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center py-12 px-4">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0" />
            <p className="text-destructive font-medium">شناسه رزرو یافت نشد</p>
          </div>
        </div>
      </div>
    );
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Mock: 80% success, 20% fail
          const success = Math.random() > 0.2;
          if (success) {
            router.push(`/payment/success?bookingId=${bookingId}`);
          } else {
            router.push(`/payment/failed?bookingId=${bookingId}`);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-card rounded-2xl shadow-2xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <CreditCard className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">درگاه پرداخت</h1>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            پرداخت امن با رمزنگاری SSL
          </p>
        </div>

        {/* Mock Payment Form */}
        <form onSubmit={handlePayment} className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                این یک درگاه پرداخت آزمایشی است. هیچ مبلغ واقعی دریافت نمی‌شود.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber">شماره کارت</Label>
            <Input
              id="cardNumber"
              type="text"
              placeholder="0000-0000-0000-0000"
              maxLength={19}
              disabled={isProcessing}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">تاریخ انقضا</Label>
              <Input
                id="expiry"
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                disabled={isProcessing}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV2</Label>
              <Input
                id="cvv"
                type="text"
                placeholder="000"
                maxLength={4}
                disabled={isProcessing}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isProcessing}
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                در حال پردازش... ({countdown})
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 ml-2" />
                پرداخت امن
              </>
            )}
          </Button>
        </form>

        {/* Security Badge */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
            <Lock className="w-3 h-3" />
            اطلاعات شما با رمزنگاری SSL محافظت می‌شود
          </p>
        </div>
      </motion.div>
    </div>
  );
}
