import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { login, loading, error } = useAuthContext();

    const handleChange = (e) => {
        const  { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            console.log('Login successful');
        } catch (err) {
            console.error('Faha no login:', err);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg'>
                <h3 className='text-2xl font-bold text-center text-gray-800'>Entrar no GitQuest</h3>
                {error && <div className='mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded'>{error}</div>}
                <form className='mt-4' onSubmit={handleSubmit}>
                    <div className='mt-4'>
                        <label className='block' htmlFor="email">E-mail</label>
                        <input
                            id='email'
                            name='email'
                            placeholder='seuemail@exemplo.com'
                            value={formData.email}
                            onChange={handleChange}
                            className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
                            type="email"
                            required
                        />
                    </div>
                    <div className='mt-4'>
                        <label className='block' htmlFor="password">Senha</label>
                        <input
                            id='password'
                            name='password'
                            placeholder='Sua senha'
                            value={formData.password}
                            onChange={handleChange}
                            className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
                            type="password"
                            required
                        />
                    </div>
                    <div className='flex flex-col items-center mt-4'>
                        <button 
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Entrando...' : 'Entrar'}
                        </button>
                        <a className="text-sm text-blue-600 hover:underline mt-6" href="/register">Não tem uma conta? Registre-se</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;