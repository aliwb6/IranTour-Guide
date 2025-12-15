// Generate unique booking code/number
export function generateBookingCode(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `BK-${timestamp}-${random}`
}

// Check if booking is expired
export function isBookingExpired(expiresAt: Date | null): boolean {
  if (!expiresAt) return false
  return new Date() > expiresAt
}

// Calculate expiry time (15 minutes from now)
export function calculateExpiryTime(minutes: number = 15): Date {
  return new Date(Date.now() + minutes * 60 * 1000)
}

// Calculate refund amount based on cancellation policy
export function calculateRefund(
  totalPrice: number,
  bookingDate: Date,
  eventDate: Date
): number {
  const now = new Date()
  const daysUntilEvent = Math.floor(
    (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (daysUntilEvent > 7) return totalPrice // 100% refund
  if (daysUntilEvent > 3) return totalPrice * 0.5 // 50% refund
  return 0 // No refund
}

// Calculate total price
export function calculateTotalPrice(
  pricePerPerson: number,
  numberOfAdults: number,
  numberOfChildren: number = 0,
  childrenPrice: number = 0,
  discount: number = 0
): {
  totalPrice: number
  discount: number
  finalPrice: number
} {
  const adultsPrice = pricePerPerson * numberOfAdults
  const childrenTotalPrice = childrenPrice * numberOfChildren
  const subtotal = adultsPrice + childrenTotalPrice
  const discountAmount = (subtotal * discount) / 100
  const finalPrice = subtotal - discountAmount

  return {
    totalPrice: subtotal,
    discount: discountAmount,
    finalPrice,
  }
}

// Validate booking availability
export function canBook(
  availableSpots: number | null,
  requestedSpots: number
): boolean {
  if (availableSpots === null) return true // Unlimited capacity
  return availableSpots >= requestedSpots
}
