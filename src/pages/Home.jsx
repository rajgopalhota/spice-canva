import React from "react";
import Hero from "../components/Hero";
import HeroCards from "../components/HeroCards";

const Home = () => {
  return (
    <div className="home-container">
      <Hero />
      <HeroCards />
    </div>
  );
};

export default Home;
