import React from 'react';
import { FaUtensils, FaStar, FaHeart, FaCarrot, FaFish, FaPizzaSlice, FaIceCream, FaCoffee, FaWineBottle, FaPepperHot, FaCookieBite } from 'react-icons/fa';
import { GiFruitBowl } from "react-icons/gi";

const RecipeCards = () => {
    const recipeData = [
        {
            icon: <FaUtensils color="#FF6347" />, // Red
            tagline: "200+ Recipes",
            description: "Explore a wide variety of delicious recipes."
        },
        {
            icon: <FaStar color="#FFD700" />, // Gold
            tagline: "4.8 / 5.0",
            description: "Highly rated by food enthusiasts."
        },
        {
            icon: <FaHeart color="#FF1493" />, // Pink
            tagline: "10k+ Likes",
            description: "Loved by thousands of users worldwide."
        },
        {
            icon: <GiFruitBowl color="#228B22" />, // Green
            tagline: "Healthy Choices",
            description: "Nourish your body with wholesome recipes."
        },
        {
            icon: <FaCarrot color="#FFA500" />, // Orange
            tagline: "Vegan Delights",
            description: "Discover plant-based recipes."
        },
        {
            icon: <FaFish color="#4169E1" />, // Royal Blue
            tagline: "Seafood Specials",
            description: "Savor the flavors of the ocean."
        },
        {
            icon: <FaPizzaSlice color="#FF4500" />, // Orange-Red
            tagline: "Italian Classics",
            description: "Authentic pizza and pasta recipes."
        },
        {
            icon: <FaIceCream color="#FF69B4" />, // Hot Pink
            tagline: "Sweet Treats",
            description: "Indulge in delightful desserts."
        },
        {
            icon: <FaCoffee color="#8B4513" />, // Saddle Brown
            tagline: "Morning Boost",
            description: "Start your day with coffee recipes."
        },
        {
            icon: <FaWineBottle color="#800080" />, // Purple
            tagline: "Wine Pairings",
            description: "Perfect wine and food combinations."
        },
        {
            icon: <FaPepperHot color="#FF0000" />, // Red
            tagline: "Spicy Creations",
            description: "For those who love a kick of heat."
        },
        {
            icon: <FaCookieBite color="#CD853F" />, // Peru
            tagline: "Baking Bliss",
            description: "Create mouthwatering cookies and cakes."
        }
    ];

    return (
        <div className="card-container">
            {recipeData.map((recipe, index) => (
                <div className="card" data-aos="zoom-in" key={index}>
                    <div className="icon">
                        {recipe.icon}
                    </div>
                    <p className="tagline">{recipe.tagline}</p>
                    <p>{recipe.description}</p>
                </div>
            ))}
        </div>
    );
};

export default RecipeCards;
