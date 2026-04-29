const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const { verifyToken } = require('../middleware/auth');

router.post('/', verifyToken, sessionController.logSession);
router.get('/', verifyToken, sessionController.getMySessions);
router.get('/stats', verifyToken, sessionController.getStats);
router.get('/:id', verifyToken, sessionController.getSessionById);

module.exports = router;
