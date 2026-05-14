import React, { useState } from 'react';
import { X, ShoppingCart, Zap, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ItemModal = ({ item, restaurantName, onClose }) => {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!item) return null;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(item);
    toast.success(`${qty}x ${item.name} added to cart!`);
    onClose();
  };

  const handleBuyNow = () => {
    for (let i = 0; i < qty; i++) addToCart(item);
    toast.success('Proceeding to cart!');
    onClose();
    navigate('/cart');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-56 w-full">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
          <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
            {item.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-2xl font-bold text-gray-800 leading-tight pr-4">{item.name}</h2>
            <span className="text-2xl font-bold text-primary whitespace-nowrap">₹{item.price}</span>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed mb-6">{item.description}</p>

          <p className="text-xs text-gray-400 italic mb-5">From: {restaurantName}</p>

          {/* Qty selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition"
              >
                <Minus size={16} />
              </button>
              <span className="px-5 py-2 font-bold text-gray-800">{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition"
              >
                <Plus size={16} />
              </button>
            </div>
            <span className="text-gray-500 text-sm">= ₹{item.price * qty}</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              className="flex-1 flex items-center justify-center gap-2 border-2 border-primary text-primary font-bold py-3 rounded-xl hover:bg-orange-50 transition"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition"
            >
              <Zap size={18} /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;