import type { Booking } from './booking';

// Enums matching Prisma schema
export type PaymentStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'
  | 'REFUNDED';

export type PaymentMethod =
  | 'ZARINPAL'
  | 'SAMAN'
  | 'MELLAT'
  | 'PASARGAD'
  | 'SADERAT'
  | 'PARSIAN'
  | 'CASH'
  | 'CARD'
  | 'OTHER';

// Main Payment interface matching Prisma model
export interface Payment {
  id: string;
  bookingId: string;

  // Payment Details
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;

  // Gateway Information
  gatewayName?: string | null;
  transactionId?: string | null;
  referenceId?: string | null;
  trackingCode?: string | null;
  cardNumber?: string | null; // Last 4 digits only

  // Gateway Response
  gatewayResponse?: string | null; // JSON string
  errorMessage?: string | null;

  // Timestamps
  paidAt?: Date | null;
  refundedAt?: Date | null;
  refundAmount?: number | null;
  refundReason?: string | null;

  // Additional Info
  ipAddress?: string | null;
  userAgent?: string | null;

  createdAt: Date;
  updatedAt: Date;

  // Relations (optional)
  booking?: Booking;
}

// Payment with booking details
export interface PaymentWithBooking extends Payment {
  booking: Booking;
}

// For initiating payment
export interface InitiatePaymentInput {
  bookingId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  returnUrl: string;
}

// Payment gateway response
export interface PaymentGatewayResponse {
  success: boolean;
  paymentUrl?: string;
  authority?: string;
  transactionId?: string;
  errorMessage?: string;
}

// For verifying payment
export interface VerifyPaymentInput {
  authority: string;
  status: string;
  transactionId?: string;
}

// Payment verification response
export interface PaymentVerificationResponse {
  success: boolean;
  transactionId?: string;
  referenceId?: string;
  cardNumber?: string;
  errorMessage?: string;
}

// For refund request
export interface RefundPaymentInput {
  paymentId: string;
  amount: number;
  reason: string;
}

// Payment receipt data
export interface PaymentReceipt {
  paymentId: string;
  bookingCode: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  referenceId?: string;
  paidAt: Date;
  customerName: string;
  eventTitle: string;
}

// Payment statistics
export interface PaymentStats {
  total: number;
  completed: number;
  pending: number;
  failed: number;
  refunded: number;
  totalAmount: number;
  totalRefunded: number;
}

// Zarinpal specific types
export interface ZarinpalInitResponse {
  Status: number;
  Authority: string;
  Fee?: number;
  FeeType?: string;
}

export interface ZarinpalVerifyResponse {
  Status: number;
  RefID: number;
  CardHash?: string;
  CardPan?: string;
  Fee?: number;
  FeeType?: string;
}

// Saman Bank specific types
export interface SamanInitResponse {
  token: string;
  status: number;
}

export interface SamanVerifyResponse {
  transactionId: string;
  referenceNumber: string;
  cardNumber: string;
  status: number;
}

// Generic gateway interface
export interface PaymentGateway {
  name: string;
  initiate: (data: InitiatePaymentInput) => Promise<PaymentGatewayResponse>;
  verify: (data: VerifyPaymentInput) => Promise<PaymentVerificationResponse>;
  refund?: (data: RefundPaymentInput) => Promise<boolean>;
}
