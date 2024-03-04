import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "../axios";
import LoadingBar from "react-top-loading-bar";
import toast from "react-hot-toast";
import DataLoad from "../components/DataLoad";
import { SiIfood } from "react-icons/si";

const Recipes = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  const [loading, setLoading] = useState(true);
  const [dupLoad, setDupLoad] = useState(true);

  const defaultFilters = {
    maxTime: Infinity,
    veg: false,
    nonVeg: false,
    maxIngredients: Infinity,
    searchText: "",
    category: "all",
  };

  const [filters, setFilters] = useState(defaultFilters);
  const [recipesData, setRecipesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Display loader toast with a promise
        const promise = new Promise((resolve, reject) => {
          // Fetch data from the API
          axios
            .get("/recipes")
            .then((response) => {
              setRecipesData(response.data);
              setDupLoad(false);
              resolve(); // Resolve the promise when data is fetched successfully
            })
            .catch((error) => {
              reject(error); // Reject the promise if there's an error
            });
        });

        // Show loading toast with promise
        toast.promise(promise, {
          loading: "Fetching recipes...",
          success: "Recipes fetched successfully",
          error: "Error fetching recipes",
        });
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

  const filteredRecipes = recipesData.filter((recipe) => {
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
    <>
      <LoadingBar
        color="#f11946"
        progress={loading ? 100 : 0}
        style={{ height: "5px" }}
        onLoaderFinished={() => setLoading(false)}
      />
      <div className="recipeBox">
        <h1>
          <SiIfood /> &nbsp;Food for you - {filteredRecipes.length}
        </h1>
        <hr/>
        <br />
        {!dupLoad && (
          <div className="filters" data-aos="fade-up">
            <select
              value={filters.maxTime}
              onChange={(e) =>
                handleFilterChange(
                  "maxTime",
                  e.target.value === "default"
                    ? Infinity
                    : parseInt(e.target.value)
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
                  onChange={(e) =>
                    handleFilterChange("nonVeg", e.target.checked)
                  }
                />
                <span className="slider nonVeg"></span>
              </label>
            </div>
            <select
              value={filters.maxIngredients}
              onChange={(e) =>
                handleFilterChange(
                  "maxIngredients",
                  e.target.value === "default"
                    ? Infinity
                    : parseInt(e.target.value)
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
              <option value="Rice">Rice</option>
              <option value="Sweet">Sweets</option>
              <option value="Snack">Snacks</option>
              <option value="Salad">Salad</option>
              <option value="Soup">Soups</option>
              <option value="Starter">Starter</option>
              <option value="Curry">Curry</option>
              <option value="Bevarages">Bevarages</option>
              {/* Add other categories */}
            </select>
            <input
              type="text"
              value={filters.searchText}
              onChange={(e) => handleFilterChange("searchText", e.target.value)}
              placeholder="Search..."
            />
          </div>
        )}
        {dupLoad && <DataLoad />}
        {filteredRecipes.length === 0 && (
          <DataLoad p="Sorry, your requested recipe is not available" />
        )}
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
    </>
  );
};

export default Recipes;
