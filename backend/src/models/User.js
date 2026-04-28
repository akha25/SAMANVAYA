const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'volunteer', 'admin'], default: 'user' },
  avatar: { type: String, default: '' },
  age: { type: Number },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  height: { type: Number }, // in cm
  weight: { type: Number }, // in kg
  goal: { type: String, enum: ['lose weight', 'gain muscle', 'stay fit', 'improve wellness'] },
  activityLevel: { type: String, enum: ['sedentary', 'lightly active', 'very active'] },
  dietType: { type: String, enum: ['vegetarian', 'vegan', 'non-veg', 'keto', 'diabetic'] },
  dailyCalorieGoal: { type: Number },
  macroGoals: {
    protein: { type: Number }, // in grams
    carbs: { type: Number },   // in grams
    fat: { type: Number }      // in grams
  },
  lastLogin: { type: Date },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  badges: [{ type: String }],
  notificationPreferences: {
    meals: { type: Boolean, default: true },
    water: { type: Boolean, default: true },
    workouts: { type: Boolean, default: true },
    weeklyReport: { type: Boolean, default: true }
  },
  unitSystem: { type: String, enum: ['metric', 'imperial'], default: 'metric' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
