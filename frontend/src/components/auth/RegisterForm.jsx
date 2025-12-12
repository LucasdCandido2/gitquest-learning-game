import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

function RegisterForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { register, loading, error } = useAuthContext();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            console.log('Registrado com sucesso!');
        } catch (err) {
            console.error('Falha no registro:', err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
                <h3 className="text-2xl font-bold text-center text-gray-800">Registrar no GitQuest</h3>
                {/* Exibe mensagem de erro, se houver*/}
                {error && <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

                <form className="mt-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block" htmlFor="name">Nome</label>
                        <input 
                            id="name"
                            placeholder="Seu nome"
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                            type="text" 
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block" htmlFor="email">E-mail</label>
                        <input 
                            id="email"
                            placeholder="Seu email"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                            type="email" 
                            required 
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block" htmlFor="password">Senha</label>
                        <input
                            id="password"
                            placeholder="Sua senha"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                            type="password" 
                            required
                            />
                    </div>
                    <div className="flex flex-col items-center mt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                        >
                            {loading ? 'Registrando...' : 'Registrar'}
                        </button>
                        <a className="text-sm text-blue-600 hover:underline mt-6" href="/login">Já tem uma conta? Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;