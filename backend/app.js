const express = require('express');
const mongoose = require('mongoose');
const foodRoutes = require('../backend/routes/foodRoutes');
const userRoutes = require('../backend/routes/userRoutes');
const config = require('./config');

const app = express();

// Connect to MongoDB
mongoose.connect(config.mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/food', foodRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/user', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
