const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Restaurant = require('../models/Restaurant');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding...'))
  .catch(err => console.log(err));

const restaurants = [
  {
    name: "The Gourmet Kitchen",
    cuisine: "Italian, Continental",
    rating: 4.5,
    deliveryTime: "30-40 min",
    costForTwo: 1200,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
    address: "123 Fine Dine Street, Food City",
    menu: [
      {
        name: "Classic Margherita Pizza",
        description: "Fresh basil, mozzarella, and tomato sauce on a sourdough crust.",
        price: 450,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Creamy Alfredo Pasta",
        description: "Penne pasta in a rich parmesan cream sauce.",
        price: 380,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1645112481338-3562e99988ec?auto=format&fit=crop&q=80&w=400"
      }
    ]
  },
  {
    name: "Spice Route",
    cuisine: "North Indian, Mughlai",
    rating: 4.3,
    deliveryTime: "25-35 min",
    costForTwo: 800,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
    address: "45 Curry Lane, Spice Market",
    menu: [
      {
        name: "Butter Chicken",
        description: "Tender chicken in a velvety tomato and butter gravy.",
        price: 420,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1603894584134-f132f178ce7d?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Garlic Naan",
        description: "Freshly baked clay oven bread with garlic and butter.",
        price: 60,
        category: "Bread",
        image: "https://images.unsplash.com/photo-1601050633647-8f8f5f4ad473?auto=format&fit=crop&q=80&w=400"
      }
    ]
  },
  {
    name: "Burger Haven",
    cuisine: "American, Fast Food",
    rating: 4.2,
    deliveryTime: "15-25 min",
    costForTwo: 500,
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=800",
    address: "78 Burger Boulevard, Downtown",
    menu: [
      {
        name: "Monster Cheese Burger",
        description: "Double patty, extra cheese, and our special secret sauce.",
        price: 299,
        category: "Burgers",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Crispy Peri Peri Fries",
        description: "Golden fries tossed in spicy peri peri seasoning.",
        price: 150,
        category: "Sides",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=400"
      }
    ]
  },
  {
    name: "Sushi Zen",
    cuisine: "Japanese, Asian",
    rating: 4.7,
    deliveryTime: "40-50 min",
    costForTwo: 2000,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800",
    address: "12 Zen Garden, Metro Plaza",
    menu: [
      {
        name: "Salmon Sashimi",
        description: "Fresh slices of premium grade salmon.",
        price: 850,
        category: "Sushi",
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c170db76?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Prawn Tempura",
        description: "Crispy battered deep-fried prawns served with dip.",
        price: 650,
        category: "Appetizers",
        image: "https://images.unsplash.com/photo-1558961363-fa4f23236350?auto=format&fit=crop&q=80&w=400"
      }
    ]
  }
];

const seedDB = async () => {
  try {
    await Restaurant.deleteMany({});
    await Restaurant.insertMany(restaurants);
    console.log('Data successfully seeded!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();
