import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

const register = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error || 'Error ao registrar usuario.');
        }
        throw new Error('Não foi possivel conectar ao servidor.');
    }
};

export const authService = {
    register,
};