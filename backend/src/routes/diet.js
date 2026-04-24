const express = require('express');
const router = express.Router();
const dietController = require('../controllers/dietController');
const { verifyToken } = require('../middleware/auth');

router.post('/log', verifyToken, dietController.logMeal);
router.get('/summary', verifyToken, dietController.getDailySummary);

module.exports = router;
