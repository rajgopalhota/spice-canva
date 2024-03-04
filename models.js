const mongoose = require("mongoose");

// Recipe Schema
const recipeSchema = new mongoose.Schema({
  title: String,
  image: String,
  time: Number,
  category: String,
  ingredients: [String],
  veg: Boolean,
  servings: String,
  description: {
    text: String,
    steps: [
      {
        step_number: Number,
        description: String,
      },
    ],
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  phoneNumber: String,
  email: String,
  password: String,
  savedRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = { Recipe, User };
