// frontend/src/services/lessonService.js
import api, { handleApiError } from './api';

export const lessonService = {
  async getAllLessons() {
    try {
      const response = await api.get('/lessons');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar lições (frontend):', error);
      handleApiError(error, 'Erro ao buscar lições.');
    }
  },

  async getLessonById(id) {
    try {
      const response = await api.get(`/lessons/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar lição por ID (frontend):', error);
      handleApiError(error, 'Erro ao buscar lição.');
    }
  },

  async getLessonBySlug(slug) {
    try {
      const response = await api.get(`/lessons/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar lição por slug (frontend):', error);
      handleApiError(error, 'Erro ao buscar lição.');
    }
  },
};