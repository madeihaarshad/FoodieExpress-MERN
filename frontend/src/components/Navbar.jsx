import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, LayoutDashboard, ClipboardList } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary italic">FoodieExpress</Link>

        <div className="flex items-center space-x-5">
          <Link to="/cart" className="relative flex items-center text-gray-700 hover:text-primary transition">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
            <span className="ml-1 hidden sm:block text-sm">Cart</span>
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/orders" className="flex items-center gap-1 text-gray-700 hover:text-primary transition text-sm">
                <ClipboardList size={18} />
                <span className="hidden sm:block">Orders</span>
              </Link>

              {user.isAdmin && (
                <Link to="/admin" className="flex items-center gap-1 text-gray-700 hover:text-primary transition text-sm">
                  <LayoutDashboard size={18} />
                  <span className="hidden sm:block">Admin</span>
                </Link>
              )}

              <div className="flex items-center text-gray-700">
                <User size={18} className="mr-1" />
                <span className="font-medium text-sm">{user.name.split(' ')[0]}</span>
              </div>

              <button onClick={handleLogout} className="text-gray-700 hover:text-red-500 transition" title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-600 transition text-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;