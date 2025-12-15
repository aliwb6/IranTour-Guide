import type { User } from './user';
import type { Event } from './event';

// Main Review interface matching Prisma model
export interface Review {
  id: string;
  userId: string;
  eventId: string;
  bookingId?: string | null;

  // Review Content
  rating: number; // 1-5 stars
  title?: string | null;
  comment: string;
  pros?: string | null;
  cons?: string | null;

  // Media
  images: string[];

  // Verification & Moderation
  isVerified: boolean;
  isApproved: boolean;
  isPinned: boolean;

  // Interaction
  helpfulCount: number;
  reportCount: number;

  // Organization Response
  organizationResponse?: string | null;
  respondedAt?: Date | null;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  approvedAt?: Date | null;

  // Relations (optional)
  user?: User;
  event?: Event;
}

// Review with user details
export interface ReviewWithUser extends Review {
  user: User;
}

// Review with all details
export interface ReviewWithDetails extends Review {
  user: User;
  event: Event;
}

// For creating a new review
export interface CreateReviewInput {
  eventId: string;
  bookingId?: string;
  rating: number;
  title?: string;
  comment: string;
  pros?: string;
  cons?: string;
  images?: string[];
}

// For updating a review
export interface UpdateReviewInput {
  rating?: number;
  title?: string;
  comment?: string;
  pros?: string;
  cons?: string;
  images?: string[];
}

// For organization response
export interface ReviewResponseInput {
  reviewId: string;
  response: string;
}

// Review statistics
export interface ReviewStats {
  total: number;
  averageRating: number;
  fiveStars: number;
  fourStars: number;
  threeStars: number;
  twoStars: number;
  oneStar: number;
  verified: number;
  withImages: number;
}

// Review filters
export interface ReviewFilters {
  eventId?: string;
  userId?: string;
  rating?: number;
  isVerified?: boolean;
  isApproved?: boolean;
  isPinned?: boolean;
  hasImages?: boolean;
}

// Review list response
export interface ReviewListResponse {
  reviews: ReviewWithUser[];
  stats: ReviewStats;
  total: number;
  page: number;
  limit: number;
}

// Rating distribution
export interface RatingDistribution {
  rating: number;
  count: number;
  percentage: number;
}

// Review summary for event
export interface EventReviewSummary {
  eventId: string;
  totalReviews: number;
  averageRating: number;
  distribution: RatingDistribution[];
  latestReviews: ReviewWithUser[];
  pinnedReviews: ReviewWithUser[];
}

// Review action types
export type ReviewAction =
  | 'helpful'
  | 'report'
  | 'approve'
  | 'reject'
  | 'pin'
  | 'unpin'
  | 'verify';
