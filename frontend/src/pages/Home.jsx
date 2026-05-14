import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import RestaurantCard from '../components/RestaurantCard';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/restaurants');
        setRestaurants(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch restaurants. Make sure the backend is running.');
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="pb-10">
      <Hero />
      <div className="container mx-auto px-4 mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Restaurants Near You</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
        
        {!loading && restaurants.length === 0 && !error && (
          <div className="text-center py-20">
            <h3 className="text-xl text-gray-500">No restaurants found. Try running the seed script.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
