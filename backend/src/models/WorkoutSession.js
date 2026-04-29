const mongoose = require('mongoose');

const workoutSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPlan' }, // Optional
  date: { type: Date, default: Date.now },
  duration: { type: Number, required: true }, // in minutes
  totalCalories: { type: Number, required: true },
  exercises: [{
    exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
    sets: [{
      reps: { type: Number, required: true },
      weight: { type: Number, required: true },
      completed: { type: Boolean, default: true }
    }],
    personalRecord: { type: Boolean, default: false }
  }],
  notes: { type: String },
  mood: { type: String, enum: ['great', 'good', 'okay', 'tired', 'bad'] }
}, { timestamps: true });

module.exports = mongoose.model('WorkoutSession', workoutSessionSchema);
