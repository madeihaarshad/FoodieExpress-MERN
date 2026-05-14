const mongoose = require('mongoose');

const menuItemSchema = mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true, min: 0 },
  category:    { type: String, required: true },
  imageUrl:    { type: String, default: '' },
  image:       { type: String, default: '' }, // alias kept so existing data works
  stock:       { type: Number, default: 100, min: 0 },
  rating:      { type: Number, default: 0, min: 0, max: 5 },
  isAvailable: { type: Boolean, default: true },
  createdAt:   { type: Date, default: Date.now }
});

const restaurantSchema = mongoose.Schema(
  {
    name:         { type: String, required: true },
    description:  { type: String, default: '' },
    cuisine:      { type: String, required: true },
    rating:       { type: Number, required: true, default: 0 },
    deliveryTime: { type: String, required: true },
    costForTwo:   { type: Number, required: true },
    imageUrl:     { type: String, default: '' },
    image:        { type: String, required: true },
    address:      { type: String, required: true },
    stock:        { type: Number, default: 0, min: 0 },
    menu:         [menuItemSchema],
    createdAt:    { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Restaurant', restaurantSchema);