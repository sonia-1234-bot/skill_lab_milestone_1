document.addEventListener('DOMContentLoaded', async () => {
    const foodListContainer = document.getElementById('food-list-container');
  
    try {
      const response = await fetch('/api/food');
      const foodItems = await response.json();
  
      foodItems.forEach(food => {
        const foodItemElement = document.createElement('div');
        foodItemElement.classList.add('food-item');
  
        const nameElement = document.createElement('h3');
        nameElement.textContent = food.name;
  
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = food.description;
  
        const priceElement = document.createElement('p');
        priceElement.textContent = `Price: ${food.price}`;
  
        const imageElement = document.createElement('img');
        imageElement.src = food.image_url;
        imageElement.alt = food.name;
  
        foodItemElement.appendChild(nameElement);
        foodItemElement.appendChild(descriptionElement);
        foodItemElement.appendChild(priceElement);
        foodItemElement.appendChild(imageElement);
  
        foodListContainer.appendChild(foodItemElement);
      });
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  });
  
  //4.
  // Function to fetch orders by user ID
async function fetchOrdersByUserId(userId) {
  try {
    const response = await fetch(`/api/order/user/${userId}`);
    const orders = await response.json();
    // Display orders on the frontend
    displayOrders(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
}

// Example function to display orders on the frontend
function displayOrders(orders) {
  // Display orders in the UI
}

// Function to confirm order delivery
async function confirmOrderDelivery(orderId) {
  try {
    const response = await fetch(`/api/order/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'delivered' })
    });
    const updatedOrder = await response.json();
    // Handle response or update UI as needed
  } catch (error) {
    console.error('Error confirming order delivery:', error);
  }
}

const moment = require('moment');

// Controller for aggregating food orders on a daily basis
exports.aggregateDailyOrders = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(moment().startOf('day')), $lte: new Date(moment().endOf('day')) }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          totalOrders: { $sum: 1 },
          mostOrderedFood: { $addToSet: '$foodId' } // Assuming each order has a foodId field
        }
      }
    ]);
    res.json(orders);
  } catch (error) {
    console.error('Error aggregating daily orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//7.
const moment = require('moment');

// Controller for aggregating food orders on a daily basis
exports.aggregateDailyOrders = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(moment().startOf('day')), $lte: new Date(moment().endOf('day')) }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          totalOrders: { $sum: 1 },
          mostOrderedFood: { $addToSet: '$foodId' } // Assuming each order has a foodId field
        }
      }
    ]);
    res.json(orders);
  } catch (error) {
    console.error('Error aggregating daily orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to fetch daily food orders and send most ordered food information via webhook
async function sendMostOrderedFoodInfo(userId) {
  try {
    const response = await fetch('/api/order/daily-aggregate');
    const dailyOrders = await response.json();
    // Extract most ordered food for each day and send information via webhook
    dailyOrders.forEach(order => {
      const mostOrderedFood = order.mostOrderedFood; // Array of foodIds
      const date = order._id; // Date in 'YYYY-MM-DD' format
      // Send most ordered food information via webhook
      sendWebhook(userId, mostOrderedFood, date);
    });
  } catch (error) {
    console.error('Error sending most ordered food information:', error);
  }
}

// Function to send webhook
async function sendWebhook(userId, mostOrderedFood, date) {
  try {
    const response = await fetch('/api/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, mostOrderedFood, date })
    });
    const result = await response.json();
    console.log('Webhook response:', result);
  } catch (error) {
    console.error('Error sending webhook:', error);
  }
}
