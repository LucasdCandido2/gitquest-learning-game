// backend/src/services/progressService.js
const { UserProgress, Lesson, User } = require('../models');

exports.saveProgress = async (userId, lessonId, { completed, score }) => {
  try {
    // Verifica se a lição existe
    const lesson = await Lesson.findByPk(lessonId);
    if (!lesson) {
      throw new Error('Lição não encontrada.');
    }

    const now = new Date();

    // Busca ou cria o progresso
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

    // Se já existia, atualiza
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
      },
      include: [
        {
          model: Lesson,
          as: 'lesson',
          attributes: ['id', 'title', 'slug', 'description']
        }
      ]
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
    // Busca todo o progresso do usuário
    const allProgress = await UserProgress.findAll({ 
      where: { userId: userId } 
    });

    // Conta total de lições disponíveis
    const totalLessons = await Lesson.count();

    // Filtra apenas as lições completadas
    const completed = allProgress.filter(p => p.completed);
    const totalCompleted = completed.length;

    // Calcula média de score (apenas das completadas)
    const avgScore = completed.length > 0
      ? Math.round(completed.reduce((sum, p) => sum + (p.score || 0), 0) / completed.length)
      : 0;

    // Calcula taxa de conclusão
    const completionRate = totalLessons > 0
      ? parseFloat(((totalCompleted / totalLessons) * 100).toFixed(2))
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