const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const { verifyToken } = require('../middleware/auth');

router.post('/', verifyToken, requestController.createRequest);
router.get('/', verifyToken, requestController.getRequests);
router.put('/:id', verifyToken, requestController.updateRequest);

module.exports = router;
