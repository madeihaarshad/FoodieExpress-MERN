import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Trash2, PlusCircle, Edit3, Package } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('restaurants');

  const headers = { Authorization: `Bearer ${user?.token}` };

  const fetchAll = async () => {
    try {
      const [rRes, oRes] = await Promise.all([
        axios.get('http://localhost:5000/api/restaurants'),
        axios.get('http://localhost:5000/api/orders', { headers }),
      ]);
      setRestaurants(rRes.data);
      setOrders(oRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this restaurant?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/restaurants/${id}`, { headers });
      toast.success('Restaurant deleted');
      setRestaurants(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status }, { headers });
      toast.success('Order status updated');
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status } : o));
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <Link
          to="/admin/add"
          className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-orange-600 transition"
        >
          <PlusCircle size={18} /> Add Restaurant
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setTab('restaurants')}
          className={`px-6 py-2 rounded-full font-semibold text-sm transition border ${tab === 'restaurants' ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-300 hover:border-orange-400'}`}
        >
          Restaurants ({restaurants.length})
        </button>
        <button
          onClick={() => setTab('orders')}
          className={`px-6 py-2 rounded-full font-semibold text-sm transition border ${tab === 'orders' ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-300 hover:border-orange-400'}`}
        >
          Orders ({orders.length})
        </button>
      </div>

      {/* Restaurants Tab */}
      {tab === 'restaurants' && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Restaurant</th>
                <th className="px-6 py-4 text-left">Cuisine</th>
                <th className="px-6 py-4 text-left">Rating</th>
                <th className="px-6 py-4 text-left">Menu Items</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {restaurants.map((r) => (
                <tr key={r._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={r.image} alt={r.name} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-semibold text-gray-800">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{r.cuisine}</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold text-xs">⭐ {r.rating}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{r.menu?.length || 0} items</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <Link
                        to={`/admin/edit/${r._id}`}
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="Edit"
                      >
                        <Edit3 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="text-gray-400 hover:text-red-500 transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Orders Tab */}
      {tab === 'orders' && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Order ID</th>
                <th className="px-6 py-4 text-left">Customer</th>
                <th className="px-6 py-4 text-left">Items</th>
                <th className="px-6 py-4 text-left">Total</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((o) => (
                <tr key={o._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{o._id.slice(-8)}</td>
                  <td className="px-6 py-4 font-semibold text-gray-700">{o.user?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-500">{o.items.length} item(s)</td>
                  <td className="px-6 py-4 font-bold text-orange-500">₹{o.total}</td>
                  <td className="px-6 py-4">
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusChange(o._id, e.target.value)}
                      className={`text-xs font-bold px-2 py-1 rounded-full border-0 outline-none cursor-pointer ${statusColors[o.status]}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;