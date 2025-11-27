import type { Tour } from './tour';
import type { User } from './user';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface Booking {
  id: string;
  userId: string;
  tourId: string;
  numberOfPeople: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: BookingStatus;
  specialRequests?: string;
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  tour?: Tour;
}

export interface BookingWithDetails extends Booking {
  user: User;
  tour: Tour;
}

export interface CreateBookingData {
  tourId: string;
  numberOfPeople: number;
  startDate: Date;
  specialRequests?: string;
}
