const express = require("express");
const { Recipe } = require("./models.jsx");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Route to save a new recipe
router.post("/add-recipe", async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get all recipes
router.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/import-recipes", async (req, res) => {
  try {
    console.log("object");
    // Read the data from data.json file
    const dataFilePath = path.join(__dirname, "data.json");
    const rawData = fs.readFileSync(dataFilePath);
    const recipes = JSON.parse(rawData).recipes;

    // Insert the recipes into the database
    await Recipe.insertMany(recipes);

    res.status(201).json({ message: "Recipes imported successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
