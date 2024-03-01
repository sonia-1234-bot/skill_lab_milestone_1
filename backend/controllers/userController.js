const User = require('../models/User.js.js');

// Controller for creating a new user
exports.createUser = async (req, res) => {
  const { email, name, role } = req.body;
  try {
    const newUser = await User.create({
      email,
      name,
      role
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller for fetching all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
