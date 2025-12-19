import api, { handleApiError } from './api';

export const authService = {
  async register({ nome, email, senha }) {
    try {
      const response = await api.post('/auth/register', {
        nome,
        email,
        senha,
      });

      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
      }

      return response.data;
    } catch (error) {
      console.error('Erro no authService.register:', error);
      handleApiError(error, 'Erro ao registrar usuario.');
    }
  },

  async login({ email, senha }) {
    try {
      const response = await api.post('/auth/login', {
        email,
        senha,
      });

      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
      }

      return response.data;
    } catch (error) {
      console.error('Erro no authService.login:', error);
      handleApiError(error, 'Erro ao fazer login.');
    }
  },
};