const mongoose = require('mongoose');

const mealLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'], required: true },
  foodName: { type: String, required: true },
  portionGrams: { type: Number, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('MealLog', mealLogSchema);
