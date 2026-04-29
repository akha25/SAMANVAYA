const WorkoutPlan = require('../models/WorkoutPlan');

exports.getSystemPlans = async (req, res) => {
  try {
    const plans = await WorkoutPlan.find({ createdBy: null }).populate('days.exercises.exerciseId');
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPlanById = async (req, res) => {
  try {
    const plan = await WorkoutPlan.findById(req.params.id).populate('days.exercises.exerciseId');
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCustomPlan = async (req, res) => {
  try {
    const { name, level, daysPerWeek, goal, days } = req.body;
    const plan = await WorkoutPlan.create({
      name, level, daysPerWeek, goal, days, createdBy: req.user.id
    });
    res.status(201).json(plan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMyPlans = async (req, res) => {
  try {
    const plans = await WorkoutPlan.find({ createdBy: req.user.id }).populate('days.exercises.exerciseId');
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCustomPlan = async (req, res) => {
  try {
    const plan = await WorkoutPlan.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
    if (!plan) return res.status(404).json({ message: 'Plan not found or unauthorized' });
    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
