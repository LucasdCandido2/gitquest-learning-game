const progressService = require('../services/progressService');

exports.saveProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { lessonId } = req.params;
    const { completed, score } = req.body;

    console.log('Saving progress:', { userId, lessonId, completed, score });

    const progress = await progressService.saveProgress(
      userId,
      parseInt(lessonId),
      completed,
      score
    );

    return res.status(200).json({
      message: 'Progress saved successfully.',
      progress
    });
  } catch (error) {
    console.error('Save progress error:', error);
    
    if (error.message.includes('Lesson not found')) {
      return res.status(404).json({ error: error.message });
    }
    
    return res.status(500).json({
      error: 'Erro ao salvar progresso.',
      details: error.message
    });
  }
};

exports.getProgressByLesson = async (req, res) => {
  try {
    const userId = req.user.id;
    const { lessonId } = req.params;

    console.log('Getting progress for:', { userId, lessonId });

    const progress = await progressService.getProgressByLesson(
      userId,
      parseInt(lessonId)
    );

    return res.status(200).json({
      lessonId: parseInt(lessonId),
      progress
    });
  } catch (error) {
    console.error('Get progress by lesson error:', error);
    return res.status(500).json({
      error: 'Erro ao buscar progresso.',
      details: error.message
    });
  }
};

exports.getAllProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log('Getting all progress for user:', userId);

    const progressList = await progressService.getAllProgress(userId);
    
    return res.status(200).json(progressList);
  } catch (error) {
    console.error('Get all progress error:', error);
    return res.status(500).json({
      error: 'Erro ao buscar progresso.',
      details: error.message
    });
  }
};

exports.getStats = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log('Getting stats for user:', userId);

    const stats = await progressService.getStats(userId);
    
    return res.status(200).json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    return res.status(500).json({
      error: 'Erro ao buscar estatísticas.',
      details: error.message
    });
  }
};