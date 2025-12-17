'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  Users,
  CreditCard,
  FileText,
  Download,
  Share2,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import moment from 'moment-jalaali';

interface BookingDetailsClientProps {
  booking: any; // Type from Prisma
}

export default function BookingDetailsClient({ booking }: BookingDetailsClientProps) {
  const router = useRouter();
  const [isCanceling, setIsCanceling] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const formatDate = (date: Date) => {
    return moment(date).format('jYYYY/jMM/jDD - HH:mm');
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return {
          label: 'تأیید شده',
          icon: CheckCircle,
          color: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
        };
      case 'PENDING':
        return {
          label: 'در انتظار پرداخت',
          icon: Clock,
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          border: 'border-amber-200',
        };
      case 'CANCELLED':
        return {
          label: 'لغو شده',
          icon: XCircle,
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200',
        };
      default:
        return {
          label: status,
          icon: AlertCircle,
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
        };
    }
  };

  const statusConfig = getStatusConfig(booking.status);
  const StatusIcon = statusConfig.icon;

  const handlePayment = () => {
    router.push(`/payment?bookingId=${booking.id}`);
  };

  const handleCancel = async () => {
    if (!confirm('آیا از لغو این رزرو اطمینان دارید؟')) return;

    setIsCanceling(true);
    try {
      const response = await fetch(`/api/bookings/${booking.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('رزرو با موفقیت لغو شد');
        router.refresh();
      } else {
        alert('خطا در لغو رزرو');
      }
    } catch (error) {
      alert('خطا در لغو رزرو');
    } finally {
      setIsCanceling(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            جزئیات رزرو
          </h1>
          <p className="text-muted-foreground">
            شماره پیگیری: {booking.bookingCode}
          </p>
        </motion.div>

        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${statusConfig.bg} ${statusConfig.border} border rounded-xl p-6 mb-6`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <StatusIcon className={`w-8 h-8 ${statusConfig.color}`} />
              <div>
                <p className="text-sm text-muted-foreground">وضعیت رزرو</p>
                <p className={`text-xl font-bold ${statusConfig.color}`}>
                  {statusConfig.label}
                </p>
              </div>
            </div>
            {booking.status === 'PENDING' && (
              <Button onClick={handlePayment} className="bg-primary hover:bg-primary/90">
                پرداخت
              </Button>
            )}
          </div>
        </motion.div>

        {/* Event Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            اطلاعات رویداد
          </h2>

          <div className="flex gap-4">
            {booking.event.featuredImage && (
              <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={booking.event.featuredImage}
                  alt={booking.event.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">{booking.event.title}</h3>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {formatDate(booking.event.startDate)}
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {booking.event.city} - {booking.event.venue}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            اطلاعات تماس
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">نام و نام خانوادگی</p>
                <p className="font-medium text-foreground">
                  {booking.firstName} {booking.lastName}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">ایمیل</p>
                <p className="font-medium text-foreground">{booking.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">شماره تماس</p>
                <p className="font-medium text-foreground">{booking.phone}</p>
              </div>
            </div>

            {booking.nationalId && (
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">کد ملی</p>
                  <p className="font-medium text-foreground">{booking.nationalId}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Participants & Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            جزئیات قیمت
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">
                  {formatPrice(booking.numberOfAdults * booking.pricePerPerson)} تومان
                </span>
              </div>
              <span className="text-muted-foreground">
                بزرگسال ({booking.numberOfAdults} نفر)
              </span>
            </div>

            {booking.numberOfChildren > 0 && (
              <div className="flex items-center justify-between pb-3 border-b">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">
                    {formatPrice(booking.numberOfChildren * (booking.childrenPrice || 0))} تومان
                  </span>
                </div>
                <span className="text-muted-foreground">
                  کودک ({booking.numberOfChildren} نفر)
                </span>
              </div>
            )}

            {booking.discount > 0 && (
              <div className="flex items-center justify-between pb-3 border-b text-green-600">
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    -{formatPrice((booking.totalPrice / (1 - booking.discount / 100)) * (booking.discount / 100))} تومان
                  </span>
                </div>
                <span>
                  تخفیف ({booking.discount}%)
                </span>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(booking.totalPrice)} تومان
                </span>
              </div>
              <span className="text-lg font-semibold text-foreground">مبلغ نهایی</span>
            </div>
          </div>
        </motion.div>

        {/* Special Requests */}
        {booking.specialRequests && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-xl shadow-lg p-6 mb-6"
          >
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              درخواست‌های ویژه
            </h2>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {booking.specialRequests}
            </p>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          {booking.status === 'PENDING' && (
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={isCanceling}
            >
              {isCanceling ? 'در حال لغو...' : 'لغو رزرو'}
            </Button>
          )}

          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            دانلود PDF
          </Button>

          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            اشتراک‌گذاری
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
