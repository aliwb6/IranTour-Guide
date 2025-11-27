export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export type PaymentMethod = 'ZARINPAL' | 'SAMAN' | 'MELLAT' | 'WALLET';

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId?: string;
  authority?: string;
  refNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentInitResponse {
  paymentUrl: string;
  authority: string;
}

export interface PaymentVerifyData {
  authority: string;
  status: string;
}
