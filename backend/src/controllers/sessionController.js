const WorkoutSession = require('../models/WorkoutSession');

exports.logSession = async (req, res) => {
  try {
    const { planId, duration, totalCalories, exercises, notes, mood } = req.body;
    
    // Process PRs logic could go here or frontend can flag it
    // Assuming frontend sends personalRecord flag

    const session = await WorkoutSession.create({
      userId: req.user.id,
      planId, duration, totalCalories, exercises, notes, mood
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMySessions = async (req, res) => {
  try {
    const sessions = await WorkoutSession.find({ userId: req.user.id })
      .populate('exercises.exerciseId')
      .populate('planId')
      .sort({ date: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSessionById = async (req, res) => {
  try {
    const session = await WorkoutSession.findOne({ _id: req.params.id, userId: req.user.id })
      .populate('exercises.exerciseId')
      .populate('planId');
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const sessions = await WorkoutSession.find({ userId: req.user.id });
    
    const totalSessions = sessions.length;
    const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0);
    const totalCalories = sessions.reduce((sum, s) => sum + s.totalCalories, 0);
    
    let totalPRs = 0;
    sessions.forEach(s => {
      s.exercises.forEach(e => {
        if (e.personalRecord) totalPRs++;
      });
    });

    res.json({ totalSessions, totalDuration, totalCalories, totalPRs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
