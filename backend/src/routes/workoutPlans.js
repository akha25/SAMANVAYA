const express = require('express');
const router = express.Router();
const workoutPlanController = require('../controllers/workoutPlanController');
const { verifyToken } = require('../middleware/auth');

router.get('/', workoutPlanController.getSystemPlans);
router.get('/mine', verifyToken, workoutPlanController.getMyPlans);
router.get('/:id', workoutPlanController.getPlanById);
router.post('/custom', verifyToken, workoutPlanController.createCustomPlan);
router.delete('/custom/:id', verifyToken, workoutPlanController.deleteCustomPlan);

module.exports = router;
