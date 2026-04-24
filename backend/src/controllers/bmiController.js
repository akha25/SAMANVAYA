const HealthMetric = require('../models/HealthMetric');

exports.logMetrics = async (req, res) => {
  try {
    const { date, weight, bodyFatPercent, waistCm, bmi } = req.body;
    
    const metric = await HealthMetric.create({
      userId: req.user.id,
      date,
      weight,
      bodyFatPercent,
      waistCm,
      bmi
    });
    
    res.status(201).json(metric);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMetrics = async (req, res) => {
  try {
    const metrics = await HealthMetric.find({ userId: req.user.id }).sort({ date: 1 });
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
