const MealLog = require('../models/MealLog');

exports.logMeal = async (req, res) => {
  try {
    const { date, mealType, foodName, portionGrams, calories, protein, carbs, fat } = req.body;
    
    const meal = await MealLog.create({
      userId: req.user.id,
      date,
      mealType,
      foodName,
      portionGrams,
      calories,
      protein,
      carbs,
      fat
    });
    
    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDailySummary = async (req, res) => {
  try {
    const { date } = req.query; // Expecting YYYY-MM-DD
    
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);
    
    const meals = await MealLog.find({
      userId: req.user.id,
      date: { $gte: startOfDay, $lte: endOfDay }
    });
    
    let totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    meals.forEach(m => {
      totals.calories += m.calories;
      totals.protein += m.protein;
      totals.carbs += m.carbs;
      totals.fat += m.fat;
    });
    
    res.json({ meals, totals });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
