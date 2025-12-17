const lessonService = require('../services/lessonService');

exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await lessonService.getAllLessons();
    res.status(200).json(lessons);
  } catch (error) {
    console.error('Get all lessons error:', error);
    res.status(500).json({ 
      error: 'Error fetching lessons.',
      details: error.message 
    });
  }
};

exports.getLessonById = async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await lessonService.getLessonById(id);
    res.status(200).json(lesson);
  } catch (error) {
    console.error('Get lesson by ID error:', error);
    
    if (error.message.includes('not found')) {
      return res.status(404).json({ error: error.message });
    }
    
    res.status(500).json({ 
      error: 'Error fetching lesson.',
      details: error.message 
    });
  }
};

exports.getLessonBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const lesson = await lessonService.getLessonBySlug(slug);
    res.status(200).json(lesson);
  } catch (error) {
    console.error('Get lesson by slug error:', error);
    
    if (error.message.includes('not found')) {
      return res.status(404).json({ error: error.message });
    }
    
    res.status(500).json({ 
      error: 'Error fetching lesson.',
      details: error.message 
    });
  }
};