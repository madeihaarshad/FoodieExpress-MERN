import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const AdminProductForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: '', cuisine: '', rating: '', deliveryTime: '',
    costForTwo: '', image: '', address: '',
  });

  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:5000/api/restaurants/${id}`)
        .then(({ data }) => setForm({
          name: data.name, cuisine: data.cuisine, rating: data.rating,
          deliveryTime: data.deliveryTime, costForTwo: data.costForTwo,
          image: data.image, address: data.address,
        }))
        .catch(() => toast.error('Failed to load restaurant'));
    }
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = { Authorization: `Bearer ${user?.token}` };
    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/restaurants/${id}`, form, { headers });
        toast.success('Restaurant updated!');
      } else {
        await axios.post('http://localhost:5000/api/restaurants', form, { headers });
        toast.success('Restaurant added!');
      }
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  const fields = [
    { name: 'name', label: 'Restaurant Name', type: 'text', placeholder: 'e.g. Lahori Dhaba' },
    { name: 'cuisine', label: 'Cuisine', type: 'text', placeholder: 'e.g. Pakistani, Desi, BBQ' },
    { name: 'rating', label: 'Rating (0-5)', type: 'number', placeholder: 'e.g. 4.5' },
    { name: 'deliveryTime', label: 'Delivery Time', type: 'text', placeholder: 'e.g. 30-40 min' },
    { name: 'costForTwo', label: 'Cost For Two (₹)', type: 'number', placeholder: 'e.g. 900' },
    { name: 'image', label: 'Image URL', type: 'url', placeholder: 'https://...' },
    { name: 'address', label: 'Address', type: 'text', placeholder: 'e.g. F-7 Markaz, Islamabad' },
  ];

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {isEdit ? 'Edit Restaurant' : 'Add New Restaurant'}
      </h1>
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
              <input
                type={f.type}
                name={f.name}
                value={form[f.name]}
                onChange={handleChange}
                placeholder={f.placeholder}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-700"
              />
            </div>
          ))}

          {form.image && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
              <img src={form.image} alt="preview" className="h-40 w-full object-cover rounded-xl" onError={(e) => e.target.style.display='none'} />
            </div>
          )}

          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              className="flex-1 bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition"
            >
              {isEdit ? 'Update Restaurant' : 'Add Restaurant'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="flex-1 border border-gray-300 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;