const HealthData = require('../models/HealthData');

exports.addHealthData = async (req, res) => {
  try {
    const { steps, calories, heartRate, activityType } = req.body;
    
    const newHealthData = new HealthData({
      userId: req.user.id,
      steps,
      calories,
      heartRate,
      activityType
    });
    
    const savedData = await newHealthData.save();
    res.status(201).json({ success: true, data: savedData });
  } catch (error) {
    console.error('Error adding health data:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getHealthData = async (req, res) => {
  try {
    const healthData = await HealthData.find({ userId: req.user.id }).sort({ timestamp: -1 });
    res.status(200).json({ success: true, data: healthData });
  } catch (error) {
    console.error('Error fetching health data:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
