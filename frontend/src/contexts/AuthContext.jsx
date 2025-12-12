import React, { createContext, useContext, useReducer, useEffect, Children } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

const authActions = {
    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
    INITIALIZE_FROM_STORAGE: 'INITIALIZE_FROM_STORAGE',
};

const authReducer = (state, action) => {
    switch (action.type) {
        case authActions.LOGIN_START:
            return { ...state, loading: true, error: null };
        case authActions.LOGIN_SUCCESS:
            return {
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false,
                error: null,
            };
        case authActions.LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case authActions.LOGOUT:
            return { user: null, token: null, isAuthenticated: false, loading: false, error: null };
        case authActions.INITIALIZE_FROM_STORAGE:
            return { ...state, user: action.payload.user, token: action.payload.token, isAuthenticated: !!action.payload.user, loading: false };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        token: null,
        isAuthenticated: false,
        loading: true,
        error: null,
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            dispatch({
                type: authActions.INITIALIZE_FROM_STORAGE,
                payload: { token, user: JSON.parse(user) }
            });
        } else {
            dispatch({ type: authActions.INITIALIZE_FROM_STORAGE, payload: { token: null, user: null } });
        }
    }, []);
    
    const login = async (credentials) => {
        dispatch({ type: authActions.LOGIN_START });
        try {
            const response = await authService.login(credentials);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            dispatch({ type: authActions.LOGIN_SUCCESS, payload: response });
            return response;
        } catch (error) {
            dispatch({ type: authActions.LOGIN_FAILURE, payload: error.message });
            throw error;
        }
    };

    const register = async (userData) => {
        dispatch({ type: authActions.LOGIN_START });
        try {
            const response = await authService.register(userData);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user ));
            dispatch({ type: authActions.LOGIN_SUCCESS, payload: response });
            return response;
        } catch (err) {
            dispatch({ type: authActions.LOGIN_FAILURE, payload: err.message });
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: authActions.LOGOUT });
    };

    const value= {
        ...state,
        login,
        register,
        logout,
    };
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}