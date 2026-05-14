import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { PackageOpen } from 'lucide-react';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
};

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/orders/my', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );

  if (orders.length === 0) return (
    <div className="text-center py-24">
      <PackageOpen size={80} className="mx-auto text-gray-300 mb-4" />
      <h2 className="text-2xl font-bold text-gray-600">No orders yet</h2>
      <p className="text-gray-400 mt-2">Your past orders will appear here.</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs text-gray-400">Order ID</p>
                <p className="font-mono text-sm text-gray-600">{order._id}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </div>

            <div className="divide-y">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-3">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity} × ₹{item.price}</p>
                  </div>
                  <p className="font-bold text-orange-500">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between items-center">
              <span className="text-gray-600 font-medium">Total Paid</span>
              <span className="text-xl font-bold text-orange-500">₹{order.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;