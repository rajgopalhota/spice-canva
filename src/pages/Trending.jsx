import React from 'react';

const TrendingFoods = () => {
  const foods = [
    { name: 'Pizza', image: 'pizza.jpg' },
    { name: 'Burger', image: 'burger.jpg' },
    { name: 'Sushi', image: 'sushi.jpg' },
    { name: 'Tacos', image: 'tacos.jpg' },
  ];

  return (
    <div>
      <h2>Trending Foods</h2>
      <div className="food-cards">
        {foods.map((food, index) => (
          <div key={index} className="food-card">
            <img src={food.image} alt={food.name} />
            <h3>{food.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingFoods;
