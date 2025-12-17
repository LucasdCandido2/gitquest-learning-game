const { UserProgress, Lesson, sequelize } = require('../models');

exports.saveProgress = async (userId, lessonId, completed, score) => {
  try {
    const lesson = await Lesson.findByPk(lessonId);
    if (!lesson) {
      throw new Error('Lesson not found.');
    }

    const now = new Date();

    const [progress, created] = await UserProgress.findOrCreate({
      where: { 
        userId: userId, 
        lessonId: lessonId 
      },
      defaults: {
        completed: !!completed,
        score: score || 0,
        completedAt: completed ? now : null
      }
    });

    if (!created) {
      progress.completed = !!completed;
      progress.score = score || 0;
      progress.completedAt = completed ? now : progress.completedAt;
      await progress.save();
    }

    return progress;
  } catch (error) {
    console.error('Error in saveProgress service:', error);
    throw error;
  }
};

exports.getProgressByLesson = async (userId, lessonId) => {
  try {
    const progress = await UserProgress.findOne({
      where: {
        userId: userId,
        lessonId: lessonId
      }
    });

    return progress;
  } catch (error) {
    console.error('Error in getProgressByLesson service:', error);
    throw error;
  }
};

exports.getAllProgress = async (userId) => {
  try {
    const progressList = await UserProgress.findAll({
      where: { userId: userId },
      include: [
        {
          model: Lesson,
          as: 'lesson',
          attributes: ['id', 'title', 'slug', 'description']
        }
      ],
      order: [['lessonId', 'ASC']]
    });

    return progressList;
  } catch (error) {
    console.error('Error in getAllProgress service:', error);
    throw error;
  }
};

exports.getStats = async (userId) => {
  try {
    const allProgress = await UserProgress.findAll({ 
      where: { userId: userId } 
    });

    const totalLessons = await Lesson.count();

    const completed = allProgress.filter(p => p.completed);
    const totalCompleted = completed.length;

    const avgScore = completed.length > 0
      ? Math.round(completed.reduce((sum, p) => sum + (p.score || 0), 0) / completed.length)
      : 0;

    const completionRate = totalLessons > 0
      ? parseFloat((totalCompleted / totalLessons).toFixed(2))
      : 0;

    return {
      totalLessons,
      completedLessons: totalCompleted,
      avgScore,
      completionRate
    };
  } catch (error) {
    console.error('Error in getStats service:', error);
    throw error;
  }
};