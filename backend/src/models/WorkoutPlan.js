const mongoose = require('mongoose');

const workoutPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  daysPerWeek: { type: Number, required: true },
  goal: { type: String, enum: ['weight-loss', 'muscle-gain', 'endurance', 'flexibility'], required: true },
  days: [{
    dayName: { type: String, required: true },
    exercises: [{
      exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
      sets: { type: Number, required: true },
      reps: { type: String, required: true },
      restSecs: { type: Number, default: 60 },
      notes: { type: String }
    }]
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null } // null = system plan
}, { timestamps: true });

module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);
