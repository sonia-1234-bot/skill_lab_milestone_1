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
  