const UserProfile = require('../models/UserProfile');
const { calculateMacros } = require('../utils/calculator');

exports.calculateBMR = (req, res) => {
  try {
    const { age, weight, height, gender, activityLevel, goal } = req.body;
    const result = calculateMacros(age, weight, height, gender, activityLevel, goal);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.saveProfile = async (req, res) => {
  try {
    const { age, weight, height, gender, activityLevel, goal } = req.body;
    
    let profile = await UserProfile.findOne({ userId: req.user.id });
    
    if (profile) {
      profile.age = age;
      profile.weight = weight;
      profile.height = height;
      profile.gender = gender;
      profile.activityLevel = activityLevel;
      profile.goal = goal;
      await profile.save();
    } else {
      profile = await UserProfile.create({
        userId: req.user.id,
        age, weight, height, gender, activityLevel, goal
      });
    }

    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.user.id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
