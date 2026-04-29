const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      user.lastLogin = new Date();
      await user.save();

      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        isOnboarded: !!user.goal // Check if they finished onboarding
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.googleOAuth = async (req, res) => {
  // Placeholder for Google OAuth logic
  res.status(200).json({ message: 'Google OAuth not fully implemented yet' });
};

exports.onboard = async (req, res) => {
  try {
    const { age, gender, height, weight, goal, activityLevel, dietType } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate BMR (Mifflin-St Jeor)
    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'female') {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
      // average for 'other'
      bmr = 10 * weight + 6.25 * height - 5 * age - 78;
    }

    // Activity Multiplier
    let multiplier = 1.2; // sedentary
    if (activityLevel === 'lightly active') multiplier = 1.375;
    if (activityLevel === 'very active') multiplier = 1.725;

    let tdee = bmr * multiplier;

    // Goal Adjustment
    let calorieGoal = tdee;
    if (goal === 'lose weight') calorieGoal -= 500;
    if (goal === 'gain muscle') calorieGoal += 500;

    // Macros: 30% protein, 45% carbs, 25% fat
    const proteinGrams = (calorieGoal * 0.3) / 4;
    const carbsGrams = (calorieGoal * 0.45) / 4;
    const fatGrams = (calorieGoal * 0.25) / 9;

    user.age = age;
    user.gender = gender;
    user.height = height;
    user.weight = weight;
    user.goal = goal;
    user.activityLevel = activityLevel;
    user.dietType = dietType;
    user.dailyCalorieGoal = Math.round(calorieGoal);
    user.macroGoals = {
      protein: Math.round(proteinGrams),
      carbs: Math.round(carbsGrams),
      fat: Math.round(fatGrams)
    };

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
