import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary italic">
          FoodieExpress
        </Link>

        <div className="hidden md:flex items-center flex-1 mx-10">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search for restaurants and food"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <Link to="/cart" className="relative flex items-center text-gray-700 hover:text-primary transition">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
            <span className="ml-2 hidden sm:block">Cart</span>
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-700">
                <User size={20} className="mr-1" />
                <span className="font-medium">{user.name.split(' ')[0]}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-500 transition"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
