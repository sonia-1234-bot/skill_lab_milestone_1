const express = require('express');
const router = express.Router();
const Food = require('backend\models\Food.js');

// Get all food items
router.get('/', async (req, res) => {
  try {
    const foodItems = await Food.find();
    res.json(foodItems);
  } catch (err) {
    console.error('Error fetching food items:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
