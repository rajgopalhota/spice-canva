import React, { useState, useEffect } from "react";
import axios from "../axios";
import LoadingBar from "react-top-loading-bar";
import toast from "react-hot-toast";
import DataLoad from "../components/DataLoad";
import RecipeCard from "../components/RecipeCard";
import { TbTrendingUp } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";

const Recipes = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  const [loading, setLoading] = useState(true);
  const [recipesData, setRecipesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/recipes");
        setRecipesData(response.data);
        setLoading(false);
        toast.success("Trending updated");
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        toast.error("Error fetching recipes");
      }
    };

    fetchData();
  }, []);

  // Function to group recipes by category
  const groupRecipesByCategory = () => {
    const groupedRecipes = {};
    recipesData.forEach((recipe) => {
      const category = recipe.category;
      if (!groupedRecipes[category]) {
        groupedRecipes[category] = [];
      }
      groupedRecipes[category].push(recipe);
    });
    return groupedRecipes;
  };

  // Function to select random recipes from each category
  const selectRandomRecipes = (categoryRecipes) => {
    const randomRecipes = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * categoryRecipes.length);
      randomRecipes.push(categoryRecipes[randomIndex]);
      categoryRecipes.splice(randomIndex, 1);
    }
    console.log(randomRecipes);
    return randomRecipes;
  };

  // JSX rendering
  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={loading ? 100 : 0}
        style={{ height: "5px" }}
        onLoaderFinished={() => setLoading(false)}
      />
      <div className="recipeBox">
        <h1>
          <TbTrendingUp /> &nbsp;Trending dishes!
          <hr />
        </h1>
        {loading ? (
          <DataLoad />
        ) : (
          <>
            {/* Group recipes by category */}
            <div className="category-container">
              {Object.entries(groupRecipesByCategory()).map(
                ([category, recipes]) => (
                  <div key={category} className="item-container">
                    <h2>
                      <MdOutlineCategory /> &nbsp;{category}
                    </h2>
                    <hr />
                    <div className="recipes-container items">
                      {/* Select and display three random recipes for each category */}
                      {selectRandomRecipes([...recipes]).map(
                        (recipe) =>
                          recipe && (
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
                          )
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Recipes;
