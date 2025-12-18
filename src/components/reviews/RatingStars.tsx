import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

export default function RatingStars({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = false,
  className = '',
}: RatingStarsProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: maxRating }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
      {showNumber && (
        <span className="mr-2 text-sm font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
