const { Lesson } = require('../models');

exports.getAllLessons = async () => {
  try {
    const lessons = await Lesson.findAll({
      order: [['id', 'ASC']]
    });
    return lessons;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
};

exports.getLessonById = async (id) => {
  try {
    const lesson = await Lesson.findByPk(id);
    
    if (!lesson) {
      throw new Error('Lesson not found.');
    }
    
    return lesson;
  } catch (error) {
    console.error('Error fetching lesson by ID:', error);
    throw error;
  }
};

exports.getLessonBySlug = async (slug) => {
  try {
    const lesson = await Lesson.findOne({
      where: { slug }
    });
    
    if (!lesson) {
      throw new Error('Lesson not found.');
    }
    
    return lesson;
  } catch (error) {
    console.error('Error fetching lesson by slug:', error);
    throw error;
  }
};