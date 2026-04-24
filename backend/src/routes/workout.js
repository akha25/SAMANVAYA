const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const { verifyToken } = require('../middleware/auth');

router.post('/log', verifyToken, workoutController.logWorkout);
router.get('/', verifyToken, workoutController.getWorkouts);

module.exports = router;
