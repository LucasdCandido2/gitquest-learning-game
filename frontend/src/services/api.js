import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export function handleApiError(error, defaultMessage = 'Erro ao conectar ao servidor.') {
  if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
    throw new Error(defaultMessage);
  }

  if (error.response) {
    const backendMessage =
      error.response.data?.error ||
      error.response.data?.message ||
      defaultMessage;
    throw new Error(backendMessage);
  }

  throw new Error(defaultMessage);
}

export default api;