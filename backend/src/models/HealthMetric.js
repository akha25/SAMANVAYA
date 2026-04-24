const mongoose = require('mongoose');

const healthMetricSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  weight: { type: Number, required: true }, // in kg
  bodyFatPercent: { type: Number },
  waistCm: { type: Number },
  bmi: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('HealthMetric', healthMetricSchema);
