import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating = 0, max = 5 }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(max)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}
        />
      ))}
      <span className="ml-1 text-sm text-gray-500">({rating})</span>
    </div>
  );
};

export default StarRating;