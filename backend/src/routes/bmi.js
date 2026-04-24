const express = require('express');
const router = express.Router();
const bmiController = require('../controllers/bmiController');
const { verifyToken } = require('../middleware/auth');

router.post('/log', verifyToken, bmiController.logMetrics);
router.get('/', verifyToken, bmiController.getMetrics);

module.exports = router;
