const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');
const { verifyToken } = require('../middleware/auth');

// Public routes
router.get('/blogs', communityController.getBlogs);
router.get('/blogs/:slug', communityController.getBlogBySlug);

// Protected routes
router.get('/feed', verifyToken, communityController.getFeed);
router.post('/feed', verifyToken, communityController.createPost);

module.exports = router;
