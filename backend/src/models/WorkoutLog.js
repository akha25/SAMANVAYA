const mongoose = require('mongoose');

const workoutLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  planName: { type: String, required: true },
  exercises: [{
    name: { type: String, required: true },
    sets: { type: Number },
    reps: { type: Number },
    weight: { type: Number },
    duration: { type: Number } // in minutes
  }],
  totalDuration: { type: Number }, // in minutes
  caloriesBurned: { type: Number },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('WorkoutLog', workoutLogSchema);
