const { UserProgress, Lesson, User } = require('../models');

const progressService = {
    async saveProgress(userId, lessonId, data) {
        const { completed, score } = data;

        const lesson = await Lesson.findByPk(lessonId);
        if (!lesson) {
            throw new Error('Lição não encontrada');
        }

        let progress = await UserProgress.findOne({
            where: { userId, lessonId }
        });

        if (progress) {
            progress.completed = completed !== undefined ? completed : progress.completed;
            progress.score = score !== undefined ? score : progress.score;
            await progress.save();
        } else {
            progress = await UserProgress.create({
                userId,
                lessonId,
                completed: completed || false,
                score: score || 0
            });
        }

        return progress;
    },

    async getProgressByLesson(userId, lessonId) {
        const progress = await UserProgress.findOne({
            where: { userId, lessonId },
            include: [
                {
                    model: Lesson,
                    attributes: ['id', 'title', 'slug', 'order']
                }
            ]
        });

        return progress;
    },

    async getAllProgress(userId) {
        const progress = await UserProgress.findAll({
            where: { userId },
            include: [
                {
                    model: Lesson,
                    attributes: ['id', 'title', 'slug', 'description', 'order', 'published']
                }
            ],
        });

        return progress;
    },async getUserStats(userId) {
    const allProgress = await UserProgress.findAll({
      where: { userId }
    });

    const totalLessons = await Lesson.count({ where: { published: true } });
    const completedLessons = allProgress.filter(p => p.completed).length;
    const totalScore = allProgress.reduce((sum, p) => sum + (p.score || 0), 0);
    const averageScore = allProgress.length > 0 ? totalScore / allProgress.length : 0;

    return {
      totalLessons,
      completedLessons,
      inProgress: allProgress.length - completedLessons,
      totalScore,
      averageScore: Math.round(averageScore * 100) / 100,
      completionRate: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
    };
  }
};

module.exports = progressService;