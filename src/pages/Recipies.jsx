import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";

const Recipes = () => {
  
  const defaultFilters = {
    maxTime: Infinity,
    veg: false,
    nonVeg: false,
    maxIngredients: Infinity,
    searchText: "",
    category: "all",
  };

  const [filters, setFilters] = useState(defaultFilters);
  const [shuffledRecipes, setShuffledRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const response = await axios.get("http://localhost:5000/api/recipes");
        // Shuffle the recipes
        console.log(response.data)
        const shuffled = response.data.sort(() => Math.random() - 0.5);
        setShuffledRecipes(shuffled);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filterName, value) => {
    if (filterName === "veg" && value) {
      setFilters({ ...filters, veg: true, nonVeg: false });
    } else if (filterName === "nonVeg" && value) {
      setFilters({ ...filters, veg: false, nonVeg: true });
    } else {
      setFilters({ ...filters, [filterName]: value });
    }
  };

  const filteredRecipes = shuffledRecipes.filter((recipe) => {
    return (
      (filters.maxTime === Infinity || recipe.time <= filters.maxTime) &&
      ((filters.veg && recipe.veg) ||
        (filters.nonVeg && !recipe.veg) ||
        (!filters.veg && !filters.nonVeg)) &&
      (filters.maxIngredients === Infinity ||
        recipe.ingredients.length <= filters.maxIngredients) &&
      (filters.searchText === "" ||
        recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        recipe.ingredients
          .join()
          .toLowerCase()
          .includes(filters.searchText.toLowerCase())) &&
      (filters.category === "all" || recipe.category === filters.category)
    );
  });

  return (
    <div className="recipeBox">
      <h1>Food for you - {filteredRecipes.length}</h1>
      <br />
      <div className="filters" data-aos="fade-up">
        <select
          value={filters.maxTime}
          onChange={(e) =>
            handleFilterChange(
              "maxTime",
              e.target.value === "default" ? Infinity : parseInt(e.target.value)
            )
          }
        >
          <option value="default">Cooking Time (minutes)</option>
          <option value={15}>Less than 15</option>
          <option value={30}>Less than 30</option>
          <option value={60}>Less than 60</option>
        </select>
        <div className="vegNonVeg">
          <label className="switch" title="Veg filter">
            <input
              type="checkbox"
              checked={filters.veg}
              onChange={(e) => handleFilterChange("veg", e.target.checked)}
            />
            <span className="slider veg"></span>
          </label>
          <label className="switch" title="Non-Veg filter">
            <input
              type="checkbox"
              checked={filters.nonVeg}
              onChange={(e) => handleFilterChange("nonVeg", e.target.checked)}
            />
            <span className="slider nonVeg"></span>
          </label>
        </div>
        <select
          value={filters.maxIngredients}
          onChange={(e) =>
            handleFilterChange(
              "maxIngredients",
              e.target.value === "default" ? Infinity : parseInt(e.target.value)
            )
          }
        >
          <option value="default">Number of Ingredients</option>
          <option value={5}>Less than 5</option>
          <option value={10}>Less than 10</option>
          <option value={15}>Less than 15</option>
        </select>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="rice">Rice</option>
          <option value="pasta">Pasta</option>
          {/* Add other categories */}
        </select>
        <input
          type="text"
          value={filters.searchText}
          onChange={(e) => handleFilterChange("searchText", e.target.value)}
          placeholder="Search..."
        />
      </div>
      <div className="recipes-container">
        {filteredRecipes.map((recipe) => (
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
