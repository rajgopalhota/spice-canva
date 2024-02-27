import React, { useState, useEffect } from 'react';
import recipesData from '../data/recepies.json'; // Assuming you have a JSON file with recipes data
import RecipeCard from '../components/RecipeCard'; // Assuming RecipeCard component is in the same directory

const TrendingFoods = () => {
  const [vegetarianRecipes, setVegetarianRecipes] = useState([]);
  const [nonVegetarianRecipes, setNonVegetarianRecipes] = useState([]);

  useEffect(() => {
    // Filter recipes into vegetarian and non-vegetarian categories
    const vegRecipes = recipesData.recipes.filter(recipe => recipe.veg);
    const nonVegRecipes = recipesData.recipes.filter(recipe => !recipe.veg);

    // Shuffle recipes
    const shuffleArray = array => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    // Shuffle and select 3 recipes from each category
    const shuffledVegRecipes = shuffleArray(vegRecipes).slice(0, 3);
    const shuffledNonVegRecipes = shuffleArray(nonVegRecipes).slice(0, 3);

    setVegetarianRecipes(shuffledVegRecipes);
    setNonVegetarianRecipes(shuffledNonVegRecipes);
  }, []);

  return (
    <div className='trending'>
      <h2>Trending Foods</h2>
      <div className='recipes-container'>
        {vegetarianRecipes.map(recipe => (
          <RecipeCard
            key={recipe._id}
            id={recipe._id}
            title={recipe.title}
            image={recipe.image}
            veg={recipe.veg}
            time={recipe.time}
            ingredients={recipe.ingredients}
            servings={recipe.servings}
            description={recipe.description}
          />
        ))}
      </div>
      <div className='recipes-container'>
        {nonVegetarianRecipes.map(recipe => (
          <RecipeCard
            key={recipe._id}
            id={recipe._id}
            title={recipe.title}
            image={recipe.image}
            veg={recipe.veg}
            time={recipe.time}
            ingredients={recipe.ingredients}
            servings={recipe.servings}
            description={recipe.description}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingFoods;
