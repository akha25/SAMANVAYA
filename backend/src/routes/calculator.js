const express = require('express');
const router = express.Router();
const calculatorController = require('../controllers/calculatorController');
const { verifyToken } = require('../middleware/auth');

router.post('/bmr', calculatorController.calculateBMR);
router.post('/save', verifyToken, calculatorController.saveProfile);
router.get('/profile', verifyToken, calculatorController.getProfile);

module.exports = router;
