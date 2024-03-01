import React from "react";

const RecipeDetails = ({ recipe }) => {
  console.log(recipe);

  // Extract ingredients and steps from the recipe object
  const { title, image, ingredients, time, description, veg, servings } = recipe;

  // Render ingredients
  const renderIngredients = ingredients.map((ingredient, index) => (
    <li key={index}>{ingredient}</li>
  ));

  // Render steps
  const renderSteps = description.steps.map((step) => (
    <li key={step._id}>
      Step {step.step_number}: {step.description}
    </li>
  ));

  return (
    <div className="recipe-details">
      <h2>{title} - {veg ? 'Vegetarian':'Non-vegetarian'}</h2>
      <p>{description.text}</p>
      <img src={image} alt={title} />
      <p>Time required: {time} minutes</p>
      <p>Serves: {servings} persons</p>
      <h3>Ingredients:</h3>
      <ul>{renderIngredients}</ul>

      <h3>Steps</h3>
      <ul>{renderSteps}</ul>
    </div>
  );
};

export default RecipeDetails;
