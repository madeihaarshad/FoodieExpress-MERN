const mongoose = require('mongoose');

const menuItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  isAvailable: { type: Boolean, default: true }
});

const restaurantSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    deliveryTime: { type: String, required: true },
    costForTwo: { type: Number, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    menu: [menuItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Restaurant', restaurantSchema);
