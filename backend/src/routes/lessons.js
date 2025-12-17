const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.get('/', lessonController.getAllLessons);
router.get('/slug/:slug', lessonController.getLessonBySlug);
router.get('/:id', lessonController.getLessonById);

module.exports = router;