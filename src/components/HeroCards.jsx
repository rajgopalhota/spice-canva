import React from 'react';
import { FaUtensils, FaStar, FaHeart } from 'react-icons/fa'; // Import React icons

const RecipeCards = () => {
    return (
        <div className="card-container">
            <div className="card" data-aos="zoom-in">
                <div className="icon">
                    <FaUtensils />
                </div>
                <p className="tagline">200+ Recipes</p>
            </div>
            <div className="card" data-aos="zoom-in">
                <div className="icon">
                    <FaStar />
                </div>
                <p className="tagline">4.8 / 5.0</p>
            </div>
            <div className="card" data-aos="zoom-in">
                <div className="icon">
                    <FaHeart />
                </div>
                <p className="tagline">10k+ Likes</p>
            </div>
        </div>
    );
};

export default RecipeCards;
