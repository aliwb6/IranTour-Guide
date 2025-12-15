import type { Event } from './event';
import type { User } from './user';
import type { Payment } from './payment';

// Enums matching Prisma schema
export type BookingStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'EXPIRED';

// Main Booking interface matching Prisma model
export interface Booking {
  id: string;
  bookingCode: string;
  userId: string;
  eventId: string;
  eventTitle: string;
  eventDate: Date;

  // Contact Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationalId?: string | null;

  // Booking Details
  numberOfAdults: number;
  numberOfChildren: number;
  totalParticipants: number;
  specialRequests?: string | null;
  notes?: string | null;

  // Pricing
  pricePerPerson: number;
  childrenPrice?: number | null;
  totalPrice: number;
  discount?: number | null;
  finalPrice: number;

  // Status & Timestamps
  status: BookingStatus;
  confirmedAt?: Date | null;
  cancelledAt?: Date | null;
  cancellationReason?: string | null;
  completedAt?: Date | null;
  expiresAt?: Date | null;

  // Additional Info
  source?: string | null;
  referenceNumber?: string | null;

  createdAt: Date;
  updatedAt: Date;

  // Relations (optional)
  user?: User;
  event?: Event;
  payment?: Payment | null;
}

// Booking with all relations
export interface BookingWithDetails extends Booking {
  user: User;
  event: Event;
  payment: Payment | null;
}

// For creating a new booking
export interface CreateBookingInput {
  eventId: string;
  eventTitle: string;
  eventDate: Date | string;

  // Contact Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationalId?: string;

  // Booking Details
  numberOfAdults: number;
  numberOfChildren?: number;
  specialRequests?: string;

  // Pricing
  pricePerPerson: number;
  childrenPrice?: number;
  discount?: number;
}

// For updating booking
export interface UpdateBookingInput {
  numberOfAdults?: number;
  numberOfChildren?: number;
  specialRequests?: string;
  notes?: string;
  phone?: string;
  email?: string;
}

// For booking summary/display
export interface BookingSummary {
  id: string;
  bookingCode: string;
  eventTitle: string;
  eventDate: Date;
  totalParticipants: number;
  finalPrice: number;
  status: BookingStatus;
  createdAt: Date;
}

// For cancellation
export interface CancelBookingInput {
  cancellationReason: string;
}

// Booking statistics
export interface BookingStats {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
  completed: number;
  expired: number;
  totalRevenue: number;
}

// For listing/filtering bookings
export interface BookingFilters {
  status?: BookingStatus;
  eventId?: string;
  userId?: string;
  startDate?: Date;
  endDate?: Date;
}

// Booking list response
export interface BookingListResponse {
  bookings: Booking[];
  total: number;
  page: number;
  limit: number;
}
