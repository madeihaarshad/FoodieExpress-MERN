import React from 'react';
import { Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant._id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative h-48 overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs font-bold text-gray-800">
            {restaurant.costForTwo} for two
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-1">{restaurant.name}</h3>
          <p className="text-sm text-gray-500 mb-3 truncate">{restaurant.cuisine}</p>
          <div className="flex items-center justify-between">
            <div className={`flex items-center px-2 py-1 rounded text-white text-xs font-bold ${
              restaurant.rating >= 4 ? 'bg-green-500' : 'bg-orange-400'
            }`}>
              <Star size={12} className="mr-1 fill-current" />
              {restaurant.rating}
            </div>
            <div className="flex items-center text-gray-500 text-xs font-medium">
              <Clock size={12} className="mr-1" />
              {restaurant.deliveryTime}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
