import React from 'react';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Spice Canva</h1>
      <p>Discover the art of cooking with our delicious recipes and culinary inspiration.</p>
      <img src="/images/home-cooking.jpg" alt="Cooking at home" />
      <p>Get ready to explore a world of flavors and create mouthwatering dishes in your own kitchen.</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  );
};

export default Home;
