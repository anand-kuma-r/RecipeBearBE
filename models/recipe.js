const mongoose = require('mongoose');
const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      ingredients: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      prepTime: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      dessert: {
        type: Boolean,
        required: true
      },
      breakfast: {
        type: Boolean,
        required: true
      },
      lunch: {
        type: Boolean,
        required: true
      },
      dinner: {
        type: Boolean,
        required: true
      },
    });

module.exports = mongoose.model('Recipe', recipeSchema);