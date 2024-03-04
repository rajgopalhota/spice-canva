import React, { useState, useContext, useEffect } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Outline and filled heart icons
import { FaPlateWheat } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";
import axios from "../axios";
import { useAuth } from "../authContext";
import { toast } from "react-hot-toast";

const RecipeDetails = ({ recipe }) => {
  // Extract relevant data from the recipe object
  const { _id, title, image, ingredients, time, description, veg, servings } =
    recipe;

  const auth = useAuth();

  const [isFavorite, setIsFavorite] = useState(false); // State to track favorite status
  useEffect(() => {
    if (auth.user) {
      const isRecipeFavorite = auth.user.savedRecipes.includes(_id);
      setIsFavorite(isRecipeFavorite);
    }
  }, [auth.user]);
  // Function to toggle favorite status
  const toggleFavorite = async () => {
    setIsFavorite((prevState) => !prevState); // Toggle immediately for UI responsiveness

    // Use toast.promise to handle async operation
    await toast.promise(axios.post(`/addfav/${_id}`), {
      loading: "Loading...",
      success: isFavorite ? "Removed from favorites" : "Added to favorites",
      error: (error) => {
        console.error("Error toggling favorite:", error.message);
        setIsFavorite((prevState) => !prevState); // Revert favorite status
        return "Error toggling favorite";
      },
    });
  };

  // Function to handle recipe sharing
  const handleShare = async () => {
    try {
      await navigator.share({
        title: `Check out this recipe on Spice Mania: ${title}`,
        text: `Check out this delicious recipe - ${title}`,
        url: window.location.href,
      });
    } catch (error) {
      console.error("Error sharing:", error.message);
    }
  };

  // Render ingredients
  const renderIngredients = ingredients.map((ingredient, index) => (
    <li key={index}>{ingredient}</li>
  ));

  // Render steps
  const renderSteps = description.steps.map((step) => (
    <li key={step._id} className="procedure">
      <span>{step.step_number}</span>
      <p>{step.description}</p>
    </li>
  ));

  return (
    <div className="detailedView">
      <div className="recipe-details">
        <div className="header">
          <h2 className="title">
            {title}
            {veg ? (
              <span className="veg">veg</span>
            ) : (
              <span className="nonVeg">non-veg</span>
            )}
          </h2>
          <div className="actionHead">
            {auth.user && (
              <div className="fav-btn">
                {isFavorite ? (
                  <FaHeart onClick={toggleFavorite} className="heart-filled" />
                ) : (
                  <FaRegHeart
                    onClick={toggleFavorite}
                    className="heart-outline"
                  />
                )}
              </div>
            )}
            <button
              className="share"
              onClick={handleShare}
              title="Share this recipe"
            >
              <FaShareAlt />
            </button>
          </div>
        </div>
        <p className="start">{description.text}</p>
        <div className="img">
          <img src={image} alt={title} />
        </div>
        <div className="info-container">
          <p>
            <AiFillClockCircle /> {time} minutes
          </p>
          <p>
            <FiUsers /> {servings} persons
          </p>
          <p>
            <FaPlateWheat /> {ingredients.length} items
          </p>
        </div>
        <h3>Ingredients:</h3>
        <ul className="ingreedients">{renderIngredients}</ul>

        <h3>Steps</h3>
        <ul>{renderSteps}</ul>
      </div>
    </div>
  );
};

export default RecipeDetails;
