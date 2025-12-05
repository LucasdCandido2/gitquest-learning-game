import { useState } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const register = async (userData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await authService.register(userData);
            setUser(response.user);
            console.log('Usuario registrado com sucesso:', response);
            return response;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        error,
        register,
    };
};