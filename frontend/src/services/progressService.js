// frontend/src/services/api/progressService.js
import api, { handleApiError } from './api';

export const progressService = {
  async saveProgress(lessonId, { completed, score }) {
    try {
      const response = await api.post(`/progress/${lessonId}`, {
        completed,
        score,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao salvar progresso (frontend):', error);
      handleApiError(error, 'Erro ao salvar progresso.');
    }
  },

  async getProgressByLesson(lessonId) {
    try {
      const response = await api.get(`/progress/${lessonId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar progresso da lição (frontend):', error);
      handleApiError(error, 'Erro ao buscar progresso da lição.');
    }
  },

  async getAllProgress() {
    try {
      const response = await api.get('/progress/');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar progresso (frontend):', error);
      handleApiError(error, 'Erro ao buscar progresso.');
    }
  },

  async getStats() {
    try {
      const response = await api.get('/progress/stats');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar estatísticas (frontend):', error);
      handleApiError(error, 'Erro ao conectar ao servidor.');
    }
  },
};