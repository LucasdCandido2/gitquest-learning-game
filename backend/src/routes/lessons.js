const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const auth = require('../middleware/auth');

// todas as rotas de lições protegidas por auth
router.get('/', auth, lessonController.getAllLessons);
router.get('/:id', auth, lessonController.getLessonById);
router.get('/slug/:slug', auth, lessonController.getLessonBySlug);

module.exports = router;