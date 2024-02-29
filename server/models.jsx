const mongoose = require("mongoose");

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

module.exports = {Recipe};
