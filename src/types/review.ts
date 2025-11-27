import type { User } from './user';

export interface Review {
  id: string;
  userId: string;
  tourId: string;
  rating: number; // 1-5
  comment: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

export interface ReviewWithUser extends Review {
  user: User;
}

export interface CreateReviewData {
  tourId: string;
  rating: number;
  comment: string;
  images?: string[];
}
