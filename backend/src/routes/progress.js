const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);
router.get('/stats', progressController.getStats);
router.get('/', progressController.getAllProgress);
router.post('/:lessonId', progressController.saveProgress);
router.get('/:lessonId', progressController.getProgressByLesson);

module.exports = router;