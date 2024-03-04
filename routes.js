const express = require("express");
const { Recipe, User } = require("./models");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secret_key = "raja-spicemania-owner#1212&bhuvi*iumn@1234";

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from headers
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, secret_key); // Replace 'your_secret_key' with your actual secret key
    // Attach user object to request
    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user; // Attach user to request object for further use
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Route to save a new recipe
router.post("/add-recipe", authMiddleware, async (req, res) => {
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
    const recipes = JSON.parse(rawData); // No need for .recipes here

    console.log("Started dropping recipes");
    await Recipe.deleteMany({});
    // Insert the recipes into the database
    console.log("Inserting recipes into the database");
    await Recipe.insertMany(recipes); // Use `recipes` directly here

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

// user routes
// Route to register a new user
router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phoneNumber, password } = req.body;
    // Check if the email already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Create a new user
    user = new User({ username, email, phoneNumber, password });
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    // Save the user to the database
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, secret_key, { expiresIn: "90d" }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber, // Include other user properties as needed
          savedRecipes: user.savedRecipes,
        },
      });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to add/remove favorite recipe for a user (toggle)
router.post("/addfav/:id", authMiddleware, async (req, res) => {
  try {
    const recipeId = req.params.id;
    console.log(req.user);
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const index = user.savedRecipes.indexOf(recipeId);
    if (index === -1) {
      // If recipeId not found in savedRecipes, add it
      user.savedRecipes.push(recipeId);
    } else {
      // If recipeId found in savedRecipes, remove it
      user.savedRecipes.splice(index, 1);
    }
    await user.save();
    res.status(200).json({ message: "Favorite updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get favorite items for a user
router.get("/getfavitems", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("savedRecipes");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.savedRecipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to fetch user information using token
router.get("/fetchuser", authMiddleware, async (req, res) => {
  try {
    // Fetch the user information based on the user ID from the token
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Return user information excluding sensitive data like password
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber, // Include other user properties as needed
      savedRecipes: user.savedRecipes,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
