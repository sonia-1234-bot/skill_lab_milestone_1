const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin', 'superuser', 'user'], required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
