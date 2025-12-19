const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const auth = require('../middleware/auth');

router.get('/stats', auth, progressController.getStats);
router.get('/', auth, progressController.getAllProgress);
router.get('/:lessonId', auth, progressController.getProgressByLesson);
router.post('/:lessonId', auth, progressController.saveProgress);

module.exports = router;