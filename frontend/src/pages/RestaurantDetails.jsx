import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Star, Clock, MapPin, ShieldCheck, AlertTriangle, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import ItemModal from '../components/ItemModal';
import StarRating from '../components/StarRating';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/restaurants/${id}`);
        setRestaurant(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  const handleAddToCart = (item) => {
    const stock = item.stock ?? 100;
    if (stock === 0) {
      toast.error('This item is out of stock');
      return;
    }
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );
  if (!restaurant) return (
    <div className="text-center py-20 text-gray-500">Restaurant not found</div>
  );

  const categories = ['All', ...new Set(restaurant.menu.map(item => item.category))];
  const filteredMenu = activeCategory === 'All'
    ? restaurant.menu
    : restaurant.menu.filter(item => item.category === activeCategory);

  const getStockBadge = (stock) => {
    const s = stock ?? 100;
    if (s === 0) return { label: 'Out of Stock', cls: 'bg-red-100 text-red-600' };
    if (s <= 10) return { label: `Only ${s} left`, cls: 'bg-yellow-100 text-yellow-700' };
    return { label: 'In Stock', cls: 'bg-green-100 text-green-600' };
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Banner */}
      <div className="relative h-64 md:h-72 w-full overflow-hidden">
        <img
          src={restaurant.image || restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-1 drop-shadow">{restaurant.name}</h1>
          <p className="text-sm text-gray-300">{restaurant.cuisine}</p>
          {restaurant.description && (
            <p className="text-sm text-gray-300 mt-1">{restaurant.description}</p>
          )}
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex flex-wrap gap-6 items-center">
          <span className={`flex items-center gap-1 px-3 py-1 rounded text-white text-sm font-bold ${restaurant.rating >= 4.5 ? 'bg-green-500' : 'bg-orange-400'}`}>
            <Star size={14} className="fill-current" /> {restaurant.rating}
          </span>
          <div className="flex items-center gap-1.5 text-gray-600 text-sm">
            <Clock size={16} className="text-orange-500" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600 text-sm">
            <span className="font-bold text-orange-500">₹</span>
            <span>₹{restaurant.costForTwo} for two</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600 text-sm">
            <MapPin size={16} className="text-orange-500" />
            <span>{restaurant.address}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition border ${
                activeCategory === cat
                  ? 'bg-orange-500 text-white border-orange-500 shadow'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-orange-400 hover:text-orange-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Section heading */}
        <h2 className="text-xl font-bold text-gray-800 mb-5">
          {activeCategory === 'All' ? 'Full Menu' : activeCategory}
          <span className="text-sm text-gray-400 font-normal ml-2">({filteredMenu.length} items)</span>
        </h2>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredMenu.map((item) => {
            const stock = item.stock ?? 100;
            const stockBadge = getStockBadge(stock);
            const outOfStock = stock === 0;
            const itemImage = item.image || item.imageUrl;

            return (
              <div
                key={item._id}
                className={`bg-white rounded-xl p-4 flex shadow-sm hover:shadow-md transition border ${outOfStock ? 'opacity-70' : 'border-transparent hover:border-orange-300'}`}
              >
                {/* Left: Info */}
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                  </div>

                  {/* Star Rating */}
                  {item.rating > 0 && <StarRating rating={item.rating} />}

                  <p className="text-orange-500 font-bold mt-1">₹{item.price}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>

                  {/* Stock Indicator */}
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mt-2 ${stockBadge.cls}`}>
                    {outOfStock
                      ? <AlertTriangle size={11} />
                      : <ShieldCheck size={11} />
                    }
                    {stockBadge.label}
                  </span>

                  {/* ADD button */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={outOfStock}
                    className={`mt-3 flex items-center gap-1 px-4 py-1.5 rounded-lg font-bold text-sm border transition ${
                      outOfStock
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'
                        : 'border-orange-400 text-orange-500 hover:bg-orange-50'
                    }`}
                  >
                    <Plus size={15} /> ADD
                  </button>
                </div>

                {/* Right: Image + View Details */}
                <div
                  className="relative w-32 h-32 flex-shrink-0 cursor-pointer"
                  onClick={() => !outOfStock && setSelectedItem(item)}
                >
                  <img
                    src={itemImage}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {!outOfStock && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center py-1 rounded-b-lg">
                      View Details
                    </div>
                  )}
                  {outOfStock && (
                    <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">Unavailable</span>
                    </div>