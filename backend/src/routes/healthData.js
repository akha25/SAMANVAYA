const express = require('express');
const router = express.Router();
const healthDataController = require('../controllers/healthDataController');
const { verifyToken } = require('../middleware/auth');

router.post('/add', verifyToken, healthDataController.addHealthData);
router.get('/get', verifyToken, healthDataController.getHealthData);

module.exports = router;
