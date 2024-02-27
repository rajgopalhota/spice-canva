import React from "react";
import RecipeCard from "../components/RecipeCard"; // Assuming RecipeCard component is in the same directory
import recipesData from "../data/recepies.json"; // Assuming you have a JSON file with recipes data

const Recipes = () => {
  return (
    <div className="recipeBox">
      <div className="recipes-container">
        {recipesData.recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            id={recipe._id}
            title={recipe.title}
            image={recipe.image}
            veg={recipe.veg}
            time={recipe.time}
            ingredients={recipe.ingredients}
            servings={recipe.servings}
            description={recipe.description.text}
          />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
