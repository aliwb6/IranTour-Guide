'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Users,
  FileText,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { createBookingSchema, type CreateBookingSchema } from '@/lib/validators/booking';
import type { CreateBookingInput } from '@/types/booking';
import { Button } from '@/components/ui/button';
import BookingContactStep from './BookingContactStep';
import BookingParticipantsStep from './BookingParticipantsStep';
import BookingSummaryStep from './BookingSummaryStep';

interface BookingFormProps {
  eventId: string;
  eventTitle: string;
  eventDate: Date;
  pricePerPerson: number;
  childrenPrice?: number;
  onSubmit: (data: CreateBookingInput) => Promise<void>;
  onSuccess?: (bookingId: string) => void;
  onCancel?: () => void;
}

const STEPS = [
  { id: 1, title: 'اطلاعات تماس', icon: User, description: 'نام، ایمیل و شماره تماس' },
  { id: 2, title: 'تعداد شرکت‌کنندگان', icon: Users, description: 'بزرگسال و کودک' },
  { id: 3, title: 'بررسی و تایید', icon: FileText, description: 'خلاصه رزرو شما' },
];

export default function BookingForm({
  eventId,
  eventTitle,
  eventDate,
  pricePerPerson,
  childrenPrice = 0,
  onSubmit,
  onSuccess,
  onCancel,
}: BookingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<CreateBookingSchema>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      eventId,
      eventTitle,
      eventDate,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      nationalId: '',
      numberOfAdults: 1,
      numberOfChildren: 0,
      specialRequests: '',
      pricePerPerson,
      childrenPrice,
      discount: 0,
    },
    mode: 'onChange',
  });

  const { watch, trigger } = form;
  const formData = watch();

  // Calculate total price
  const calculateTotal = () => {
    const adultsTotal = formData.numberOfAdults * pricePerPerson;
    const childrenTotal = (formData.numberOfChildren || 0) * (childrenPrice || pricePerPerson * 0.5);
    const subtotal = adultsTotal + childrenTotal;
    const discountAmount = ((formData.discount || 0) / 100) * subtotal;
    return {
      adultsTotal,
      childrenTotal,
      subtotal,
      discountAmount,
      total: subtotal - discountAmount,
      totalParticipants: formData.numberOfAdults + (formData.numberOfChildren || 0),
    };
  };

  const handleNext = async () => {
    let fieldsToValidate: (keyof CreateBookingSchema)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ['firstName', 'lastName', 'email', 'phone', 'nationalId'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['numberOfAdults', 'numberOfChildren', 'specialRequests'];
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFormSubmit = async (data: CreateBookingSchema) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const totals = calculateTotal();

      const bookingData: CreateBookingInput = {
        ...data,
        numberOfChildren: data.numberOfChildren || 0,
        childrenPrice,
        discount: data.discount || 0,
      };

      await onSubmit(bookingData);

      if (onSuccess) {
        onSuccess('booking-id-placeholder');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'خطا در ثبت رزرو. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BookingContactStep form={form} />;
      case 2:
        return <BookingParticipantsStep form={form} />;
      case 3:
        return (
          <BookingSummaryStep
            form={form}
            eventTitle={eventTitle}
            eventDate={eventDate}
            totals={calculateTotal()}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all
                    ${
                      currentStep > step.id
                        ? 'bg-green-500 border-green-500 text-white'
                        : currentStep === step.id
                        ? 'bg-primary border-primary text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }
                  `}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <div className="mt-2 text-center hidden md:block">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                </div>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 transition-all ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {submitError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 text-right">{submitError}</p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <div>
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                مرحله قبل
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                لغو
              </Button>
            )}

            {currentStep < STEPS.length ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                مرحله بعد
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    در حال ثبت...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    تایید و ثبت رزرو
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
