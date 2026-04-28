const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  steps: { type: Number, required: true },
  calories: { type: Number, required: true },
  heartRate: { type: Number, required: true },
  activityType: { type: String, enum: ['walking', 'running', 'cycling', 'yoga', 'gym'], required: true },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('HealthData', healthDataSchema);
