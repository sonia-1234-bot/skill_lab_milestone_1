const Order = require('../models/Order.js.js');

// Controller for creating a new order
exports.createOrder = async (req, res) => {
  const { foodId, userId, userAddressId, paymentMode } = req.body;
  try {
    const newOrder = await Order.create({
      foodId,
      userId,
      userAddressId,
      paymentMode,
      status: 'pending' // Set initial status to pending
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller for updating the status of an order
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller for fetching all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller for fetching orders by user ID
exports.getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders by user ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
