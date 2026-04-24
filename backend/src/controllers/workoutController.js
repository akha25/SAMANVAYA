const WorkoutLog = require('../models/WorkoutLog');

exports.logWorkout = async (req, res) => {
  try {
    const { date, planName, exercises, totalDuration, caloriesBurned, completed } = req.body;
    
    const workout = await WorkoutLog.create({
      userId: req.user.id,
      date,
      planName,
      exercises,
      totalDuration,
      caloriesBurned,
      completed
    });
    
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await WorkoutLog.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
