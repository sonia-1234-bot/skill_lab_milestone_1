const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image_url: String,
  category: { type: String, enum: ['veg', 'non-veg', 'dessert'], required: true }
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
