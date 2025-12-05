import React, { useState } from 'react';

function RegisterForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Dados do formulario:', formData);

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
                <h3 className="text-2xl font-bold text-center text-gray-800">Registrar no GitQuest</h3>
                <form className="mt-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block" htmlFor="name">Nome</label>
                        <input 
                            id="name"
                            placeholder="Seu nome"
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
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                            type="password" 
                            required
                            />
                    </div>
                    <div className="flex flex-col items-center mt-4">
                        <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                            Registrar
                        </button>
                        <a className="text-sm text-blue-600 hover:underline" href="#">Já tem uma conta? Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;