const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  age: { type: Number, required: true },
  weight: { type: Number, required: true }, // in kg
  height: { type: Number, required: true }, // in cm
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  activityLevel: { type: String, enum: ['sedentary', 'light', 'moderate', 'active', 'very-active'], required: true },
  goal: { type: String, enum: ['lose', 'maintain', 'gain'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('UserProfile', userProfileSchema);
