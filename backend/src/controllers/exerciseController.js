const Exercise = require('../models/Exercise');

exports.getAllExercises = async (req, res) => {
  try {
    const { category, muscleGroup, difficulty, search } = req.query;
    let query = {};
    
    if (category && category !== 'All') query.category = category.toLowerCase();
    if (muscleGroup && muscleGroup !== 'All') query.muscleGroup = muscleGroup.toLowerCase();
    if (difficulty && difficulty !== 'All') query.difficulty = difficulty.toLowerCase();
    if (search) query.name = { $regex: search, $options: 'i' };

    const exercises = await Exercise.find(query);
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ message: 'Exercise not found' });
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
