import React from 'react';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }
    try {
      const items = cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.qty,
      }));
      await axios.post(
        'http://localhost:5000/api/orders',
        { items, total: cartTotal },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed');
    }
  };

  if (cartItems.length === 0) return (
    <div className="container mx-auto px-4 py-20 text-center">
      <ShoppingBag size={80} className="mx-auto text-gray-300 mb-6" />
      <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
      <p className="text-gray-500 mt-2 mb-8">Add some delicious items!</p>
      <Link to="/" className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition">
        Browse Restaurants
      </Link>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {cartItems.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-xl flex items-center mb-4 shadow-sm">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1 ml-4">
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                <p className="text-orange-500 font-bold">₹{item.price}</p>
              </div>
              <div className="flex items-center mx-4">
                <select
                  value={item.qty}
                  onChange={(e) => updateQty(item._id, e.target.value)}
                  className="bg-gray-50 border border-gray-300 rounded-md p-1 focus:outline-none"
                >
                  {[...Array(10).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </div>
              <button onClick={() => removeFromCart(item._id)} className="text-gray-400 hover:text-red-500 transition">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-orange-500">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹{cartTotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-6">
              <span className="text-lg font-bold text-gray-800">Total</span>
              <span className="text-lg font-bold text-orange-500">₹{cartTotal}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;