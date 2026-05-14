import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RestaurantDetails from './pages/RestaurantDetails';
import Cart from './pages/Cart';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col w-full">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/restaurant/:id" element={<RestaurantDetails />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>
            <footer className="bg-gray-900 text-white py-10">
              <div className="container mx-auto px-4 text-center">
                <p className="text-xl font-bold text-primary mb-2 italic">FoodieExpress</p>
                <p className="text-gray-400">© 2023 FoodieExpress Inc. All rights reserved.</p>
              </div>
            </footer>
          </div>
          <Toaster position="top-center" />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
