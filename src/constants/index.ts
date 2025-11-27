// User Roles
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  TOUR_OPERATOR: 'TOUR_OPERATOR',
  GUIDE: 'GUIDE',
  USER: 'USER',
} as const;

// Booking Status
export const BOOKING_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
} as const;

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
} as const;

// Tour Categories
export const TOUR_CATEGORIES = {
  CULTURAL: 'CULTURAL',
  NATURE: 'NATURE',
  ADVENTURE: 'ADVENTURE',
  HISTORICAL: 'HISTORICAL',
  RELIGIOUS: 'RELIGIOUS',
  FOOD: 'FOOD',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  TOURS: '/tours',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  BOOKINGS: '/bookings',
  ADMIN: '/admin',
} as const;
