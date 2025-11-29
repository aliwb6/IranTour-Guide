export type EventStyle = 'FESTIVAL' | 'EXHIBITION' | 'CONFERENCE' | 'RELIGIOUS' | 'CULTURAL' | 'ARTISTIC' | 'SPORT' | 'OTHER';

export type EventStatus = 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';

export interface Event {
  id: string;
  title: string;
  shortDescription: string;
  description?: string;
  featuredImage?: string;
  images?: string[];
  style: EventStyle;
  type: string;
  city: string;
  province?: string;
  location?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  startDate: string | Date;
  endDate?: string | Date;
  dateRangeText: string;
  shamsiStartDate?: string;
  shamsiEndDate?: string;
  status: EventStatus;
  tags?: string[];
  organizerId?: string;
  organizerName?: string;
  contactPhone?: string;
  contactEmail?: string;
  website?: string;
  isFeatured?: boolean;
  viewCount?: number;
  likeCount?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface EventFilters {
  search?: string;
  city?: string;
  province?: string;
  style?: EventStyle;
  status?: EventStatus;
  startDate?: string;
  endDate?: string;
  tags?: string[];
  isFeatured?: boolean;
}

export interface EventListProps {
  events: Event[];
  isLoading?: boolean;
}

export interface EventCardProps {
  event: Event;
}

export interface EventDetailsProps {
  event: Event;
}
