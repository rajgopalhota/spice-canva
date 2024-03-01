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

// Route to get a specific recipe by ID
router.get("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/import-recipes", async (req, res) => {
  try {
    const dataFilePath = path.join(__dirname, "data.json");
    const rawData = fs.readFileSync(dataFilePath);
    const recipes = JSON.parse(rawData).recipes;

    console.log("Started dropping recipes");
    await Recipe.deleteMany({});
    // Insert the recipes into the database
    console.log("Inserting recipes into the database");
    await Recipe.insertMany(recipes);

    res.status(201).json({ message: "Recipes imported successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/export-recipes", async (req, res) => {
  try {
    // Fetch all recipes from the database
    const recipes = await Recipe.find({});

    // Convert recipes to JSON format
    const jsonOutput = JSON.stringify(recipes);

    // Write to export.json in the root folder
    const exportFilePath = path.join(__dirname, "..", "export.json");
    fs.writeFileSync(exportFilePath, jsonOutput);

    res.status(200).json({ message: "Data exported successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
