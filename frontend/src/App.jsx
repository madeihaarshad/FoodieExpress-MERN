import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RestaurantDetails from './pages/RestaurantDetails';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import AdminDashboard from './pages/AdminDashboard';
import AdminProductForm from './pages/AdminProductForm';
import ProtectedRoute from './components/ProtectedRoute';
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

                {/* Protected: logged in users */}
                <Route path="/orders" element={
                  <ProtectedRoute><OrderHistory /></ProtectedRoute>
                } />

                {/* Protected: admin only */}
                <Route path="/admin" element={
                  <ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>
                } />
                <Route path="/admin/add" element={
                  <ProtectedRoute adminOnly><AdminProductForm /></ProtectedRoute>
                } />
                <Route path="/admin/edit/:id" element={
                  <ProtectedRoute adminOnly><AdminProductForm /></ProtectedRoute>
                } />
              </Routes>
            </main>
            <footer className="bg-gray-900 text-white py-10">
              <div className="container mx-auto px-4 text-center">
                <p className="text-xl font-bold text-primary mb-2 italic">FoodieExpress</p>
                <p className="text-gray-400">© 2024 FoodieExpress Inc. All rights reserved.</p>
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