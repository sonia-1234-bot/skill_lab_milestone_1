const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Routes for orders
router.post('/', orderController.createOrder);
router.put('/:orderId', orderController.updateOrderStatus);
router.get('/', orderController.getAllOrders);
router.get('/user/:userId', orderController.getOrdersByUserId);

module.exports = router;
