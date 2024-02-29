import React, { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import toast from "react-hot-toast";

const AddRecipe = () => {
  const [recipeData, setRecipeData] = useState({
    title: "",
    image: "",
    time: "",
    category: "",
    ingredients: [""],
    veg: false,
    servings: "",
    description: {
      text: "",
      steps: [{ step_number: 1, description: "" }],
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...recipeData.ingredients];
    updatedIngredients[index] = value;
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: updatedIngredients,
    }));
  };

  const handleAddIngredient = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, ""],
    }));
  };

  const handleRemoveIngredient = (index) => {
    if (recipeData.ingredients.length === 1) {
      toast.error("At least one ingredient is required");
      return;
    }
    const updatedIngredients = [...recipeData.ingredients];
    updatedIngredients.splice(index, 1);
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: updatedIngredients,
    }));
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...recipeData.description.steps];
    updatedSteps[index].description = value;
    setRecipeData((prevData) => ({
      ...prevData,
      description: {
        ...prevData.description,
        steps: updatedSteps,
      },
    }));
  };

  const handleAddStep = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      description: {
        ...prevData.description,
        steps: [
          ...prevData.description.steps,
          {
            step_number: prevData.description.steps.length + 1,
            description: "",
          },
        ],
      },
    }));
  };

  const handleRemoveStep = () => {
    if (recipeData.description.steps.length === 1) {
      toast.error("At least one step is required");
      return;
    }
    const updatedSteps = [...recipeData.description.steps];
    updatedSteps.pop();
    setRecipeData((prevData) => ({
      ...prevData,
      description: {
        ...prevData.description,
        steps: updatedSteps,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(recipeData);
      // Add logic to submit the recipe data to your backend
      toast.success("Recipe submitted successfully!");
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!recipeData.title) {
      errors.title = "Title is required";
    }
    if (!recipeData.image) {
      errors.image = "Image URL is required";
    }
    if (!recipeData.time) {
      errors.time = "Cooking time is required";
    } else if (isNaN(recipeData.time)) {
      errors.time = "Cooking time must be a number";
    }
    if (!recipeData.category) {
      errors.category = "Category is required";
    }
    if (recipeData.ingredients.some((ingredient) => !ingredient.trim())) {
      errors.ingredients = "All ingredients must be filled";
    }
    if (!recipeData.servings) {
      errors.servings = "Servings is required";
    } else if (!/^\d+(?:-\d+)?$/.test(recipeData.servings)) {
      errors.servings = "Invalid format for servings. Example: 5 or 5-8";
    }
    if (!recipeData.description.text) {
      errors.description = "Description is required";
    }
    if (recipeData.description.steps.some((step) => !step.description.trim())) {
      errors.steps = "All steps must be filled";
    }

    if (Object.keys(errors).length > 0) {
      toast.error(Object.values(errors)[0]); // Display only the first error
    }

    return Object.keys(errors).length === 0;
  };

  return (
    <div className="Recipecontainer">
      <h2>Add New Recipe</h2>
      <hr/><br/>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label> Recipe Title:</label>
          <input
            type="text"
            name="title"
            value={recipeData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label> Image URL:</label>
          <input
            type="text"
            name="image"
            value={recipeData.image}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label> Cooking Time (minutes):</label>
          <input
            type="text"
            name="time"
            value={recipeData.time}
            onChange={handleChange}
          />
        </div>
        <div className="form-group vegInput">
          <label> Veg (check this box if veg or leave blank):</label>
          <input
            type="checkbox"
            name="veg"
            checked={recipeData.veg}
            onChange={(e) =>
              setRecipeData((prevData) => ({
                ...prevData,
                veg: e.target.checked,
              }))
            }
          />
        </div>
        <div className="form-group">
          <label> Category:</label>
          <select
            name="category"
            value={recipeData.category}
            onChange={handleChange}
          >
            <option value="" defaultChecked hidden>Select Category</option>
            <option value="rice">Rice</option>
            <option value="breakfast">Breakfast</option>
            <option value="dal">Dal</option>
            <option value="curry">Curry</option>
            <option value="starter">Starter</option>
            <option value="fries">Fries</option>
            <option value="desert">Desert</option>
            <option value="sweet">Sweet</option>
            <option value="drinks">Drinks</option>
          </select>
        </div>
        <div className="form-group">
          <label> Ingredients:</label>
          {recipeData.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-group">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
              />
              <span
                className="handleAddRemove"
                onClick={() => handleRemoveIngredient(index)}
              >
                <AiOutlineMinusCircle />
              </span>
            </div>
          ))}
          <span className="handleAddRemove handleAddSpan" onClick={handleAddIngredient}>
            <AiOutlinePlusCircle /> Add more
          </span>
        </div>
        <div className="form-group">
          <label> Servings:</label>
          <input
            type="text"
            name="servings"
            value={recipeData.servings}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label> Description:</label>
          <textarea
            name="text"
            value={recipeData.description.text}
            onChange={(e) =>
              setRecipeData((prevData) => ({
                ...prevData,
                description: { ...prevData.description, text: e.target.value },
              }))
            }
          />
        </div>
        <div className="form-group">
          <label> Instructions:</label>
          {recipeData.description.steps.map((step, index) => (
            <div key={index} className="step-group">
              <input
                type="text"
                value={step.description}
                onChange={(e) => handleStepChange(index, e.target.value)}
              />
              <span className="handleAddRemove" onClick={handleRemoveStep}>
                <AiOutlineMinusCircle />
              </span>
            </div>
          ))}
          <span className="handleAddRemove handleAddSpan" onClick={handleAddStep}>
            <AiOutlinePlusCircle /> Add more
          </span>
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
