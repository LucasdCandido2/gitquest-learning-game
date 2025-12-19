// backend/src/controllers/progressController.js
const progressService = require('../services/progressService');

exports.saveProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { lessonId } = req.params;
    const { completed, score } = req.body;

    console.log('Salvando progresso:', { userId, lessonId, completed, score });

    const progress = await progressService.saveProgress(
      userId,
      parseInt(lessonId),
      { completed, score }
    );

    return res.status(200).json({
      message: 'Progresso salvo com sucesso',
      progress
    });
  } catch (error) {
    console.error('Erro ao salvar progresso:', error);
    
    if (error.message.includes('não encontrada')) {
      return res.status(404).json({ error: error.message });
    }

    return res.status(500).json({
      error: 'Erro ao salvar progresso',
      details: error.message
    });
  }
};

exports.getProgressByLesson = async (req, res) => {
  try {
    const userId = req.user.id;
    const { lessonId } = req.params;

    console.log('Buscando progresso:', { userId, lessonId });

    const progress = await progressService.getProgressByLesson(
      userId,
      parseInt(lessonId)
    );

    if (!progress) {
      return res.status(200).json({
        lessonId: parseInt(lessonId),
        progress: null,
        message: 'Nenhum progresso encontrado'
      });
    }

    return res.status(200).json(progress);
  } catch (error) {
    console.error('Erro ao buscar progresso:', error);
    return res.status(500).json({
      error: 'Erro ao buscar progresso',
      details: error.message
    });
  }
};

exports.getAllProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('Buscando todo progresso do usuario:', userId);
    
    const progressList = await progressService.getAllProgress(userId);
    
    return res.status(200).json(progressList);
  } catch (error) {
    console.error('Erro ao buscar progresso:', error);
    return res.status(500).json({
      error: 'Erro ao buscar progresso',
      details: error.message
    });
  }
};

exports.getStats = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('Buscando estatisticas do usuario:', userId);
    
    const stats = await progressService.getStats(userId);
    
    return res.status(200).json(stats);
  } catch (error) {
    console.error('Erro ao buscar estatisticas:', error);
    return res.status(500).json({
      error: 'Erro ao buscar estatisticas',
      details: error.message
    });
  }
};