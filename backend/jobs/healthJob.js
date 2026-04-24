const cron = require('node-cron');
const User = require('../models/User');
const HealthData = require('../models/HealthData');

// Run every 15 minutes
cron.schedule('*/15 * * * *', async () => {
  console.log('Running health data generation job...');
  try {
    const users = await User.find({ role: 'user' });
    
    for (const user of users) {
      // Check if user already has data in the last 15 minutes
      const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
      const recentData = await HealthData.findOne({
        userId: user._id,
        timestamp: { $gte: fifteenMinutesAgo }
      });

      if (!recentData) {
        // Generate random data
        const newData = new HealthData({
          userId: user._id,
          steps: Math.floor(Math.random() * 500) + 100, // 100-600 steps
          calories: Math.floor(Math.random() * 50) + 10, // 10-60 calories
          heartRate: Math.floor(Math.random() * 40) + 60, // 60-100 bpm
          activityType: 'Walking',
          timestamp: new Date()
        });
        await newData.save();
        console.log(`Generated health data for user: ${user.email}`);
      }
    }
  } catch (error) {
    console.error('Error in cron job:', error.message);
  }
});

console.log('Health generation cron job initialized.');
