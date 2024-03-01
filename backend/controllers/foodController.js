const Food = require('../models/Food.js.js');

// Controller for fetching all food items
exports.getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await Food.find();
    res.json(foodItems);
  } catch (error) {
    console.error('Error fetching food items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller for fetching food items by category
exports.getFoodItemsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const foodItems = await Food.find({ category });
    res.json(foodItems);
  } catch (error) {
    console.error('Error fetching food items by category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller for creating a new food item
exports.createFoodItem = async (req, res) => {
  const { name, description, price, image_url, category } = req.body;
  try {
    const newFoodItem = await Food.create({
      name,
      description,
      price,
      image_url,
      category
    });
    res.status(201).json(newFoodItem);
  } catch (error) {
    console.error('Error creating food item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller for updating an existing food item
exports.updateFoodItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image_url, category } = req.body;
  try {
    const updatedFoodItem = await Food.findByIdAndUpdate(id, {
      name,
      description,
      price,
      image_url,
      category
    }, { new: true });
    res.json(updatedFoodItem);
  } catch (error) {
    console.error('Error updating food item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller for deleting a food item
exports.deleteFoodItem = async (req, res) => {
  const { id } = req.params;
  try {
    await Food.findByIdAndDelete(id);
    res.json({ message: 'Food item deleted successfully' });
  } catch (error) {
    console.error('Error deleting food item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
