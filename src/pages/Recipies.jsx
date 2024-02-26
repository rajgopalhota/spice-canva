import React from 'react';

const Recipes = () => {
  const recipes = [
    {
      title: 'Spicy Chicken Tacos',
      ingredients: ['chicken', 'tortillas', 'spices', 'salsa', 'avocado'],
      instructions: '1. Marinate the chicken with spices. 2. Grill the chicken. 3. Warm up the tortillas. 4. Assemble the tacos with chicken, salsa, and avocado. 5. Enjoy!',
    },
    {
      title: 'Creamy Garlic Pasta',
      ingredients: ['pasta', 'garlic', 'cream', 'parmesan cheese', 'parsley'],
      instructions: '1. Cook the pasta according to package instructions. 2. In a pan, sauté minced garlic until fragrant. 3. Add cream and simmer until thickened. 4. Toss the cooked pasta in the creamy sauce. 5. Garnish with parmesan cheese and parsley. 6. Serve hot!',
    },
    // Add more recipes here...
  ];

  return (
    <div>
      <h1>Delicious Recipes</h1>
      {recipes.map((recipe, index) => (
        <div key={index}>
          <h2>{recipe.title}</h2>
          <h3>Ingredients:</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3>Instructions:</h3>
          <p>{recipe.instructions}</p>
        </div>
      ))}
    </div>
  );
};

export default Recipes;
