const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// GET /api/restaurants — supports ?search= and ?cuisine=
router.get('/', async (req, res) => {
  try {
    const { search, cuisine } = req.query;
    let query = {};
    if (search) query.name = { $regex: search, $options: 'i' };
    if (cuisine) query.cuisine = { $regex: cuisine, $options: 'i' };
    const restaurants = await Restaurant.find(query);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/restaurants/:id
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (restaurant) res.json(restaurant);
    else res.status(404).json({ message: 'Restaurant not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/restaurants — admin only
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/restaurants/:id — admin only
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    Object.assign(restaurant, req.body);
    const updated = await restaurant.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/restaurants/:id — admin only
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    await restaurant.deleteOne();
    res.json({ message: 'Restaurant removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;