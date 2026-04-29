const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['strength', 'cardio', 'flexibility', 'balance', 'hiit'], required: true },
  muscleGroup: { type: String, enum: ['chest', 'back', 'shoulders', 'arms', 'legs', 'core', 'full-body'], required: true },
  equipment: { type: String, enum: ['none', 'dumbbells', 'barbell', 'resistance-band', 'machine', 'cable'], required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  instructions: [{ type: String }],
  gifUrl: { type: String },
  caloriesPerMin: { type: Number, default: 5 },
  defaultSets: { type: Number, default: 3 },
  defaultReps: { type: Number, default: 10 },
  tips: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Exercise', exerciseSchema);
