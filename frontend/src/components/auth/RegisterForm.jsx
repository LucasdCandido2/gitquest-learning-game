// frontend/src/components/auth/RegisterForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register({ nome, email, senha });
      console.log('Registro bem-sucedido');
      navigate('/login'); // Redireciona para login após registro
    } catch (err) {
      console.error('Falha no registro:', err);
      setError(err.message || 'Erro ao registrar usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center text-gray-800">
          Criar conta no GitQuest
        </h3>

        {error && (
          <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form className="mt-4" onSubmit={handleSubmit}>
          {/* Campo Nome */}
          <div className="mt-4">
            <label className="block text-gray-700" htmlFor="nome">
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              type="text"
              required
            />
          </div>

          {/* Campo E-mail */}
          <div className="mt-4">
            <label className="block text-gray-700" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              type="email"
              required
            />
          </div>

          {/* Campo Senha */}
          <div className="mt-4">
            <label className="block text-gray-700" htmlFor="senha">
              Senha
            </label>
            <input
              id="senha"
              name="senha"
              placeholder="Mínimo 6 caracteres"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              type="password"
              required
              minLength={6}
            />
          </div>

          {/* Botão de Submit */}
          <div className="flex flex-col items-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
            <a
              className="text-sm text-blue-600 hover:underline mt-6"
              href="/login"
            >
              Já tem uma conta? Entrar
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;