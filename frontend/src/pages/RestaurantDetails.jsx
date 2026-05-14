import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Star, Clock, ShoppingBag, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/restaurants/${id}`);
        setRestaurant(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!restaurant) return <div className="text-center py-20">Restaurant not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between border-b-4 border-primary">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{restaurant.name}</h1>
          <p className="text-gray-500 mt-1">{restaurant.cuisine}</p>
          <p className="text-gray-400 text-sm mt-1">{restaurant.address}</p>
        </div>
        <div className="flex mt-4 md:mt-0 space-x-8">
          <div className="text-center">
            <div className="flex items-center justify-center font-bold text-gray-800">
              <Star size={18} className="text-green-500 fill-current mr-1" />
              {restaurant.rating}
            </div>
            <p className="text-xs text-gray-500 uppercase mt-1">Rating</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center font-bold text-gray-800 uppercase">
              {restaurant.deliveryTime}
            </div>
            <p className="text-xs text-gray-500 uppercase mt-1">Delivery</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center font-bold text-gray-800 uppercase">
              ₹{restaurant.costForTwo}
            </div>
            <p className="text-xs text-gray-500 uppercase mt-1">For Two</p>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {restaurant.menu.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-xl flex shadow-sm hover:shadow-md transition">
            <div className="flex-1 pr-4">
              <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
              <p className="text-sm font-medium text-gray-700">₹{item.price}</p>
              <p className="text-xs text-gray-500 mt-2 line-clamp-2">{item.description}</p>
              <button
                onClick={() => handleAddToCart(item)}
                className="mt-4 flex items-center bg-white border border-gray-300 text-primary px-4 py-1.5 rounded-lg font-bold hover:bg-orange-50 transition"
              >
                ADD <Plus size={16} className="ml-1" />
              </button>
            </div>
            <div className="w-32 h-32 relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetails;
