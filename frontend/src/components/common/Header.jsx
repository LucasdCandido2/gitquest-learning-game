// frontend/src/components/layout/Header.jsx
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/dashboard" 
          className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition"
        >
          GitQuest
        </Link>

        {/* Navigation */}
        {user && (
          <nav className="flex items-center gap-6">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-400 font-semibold border-b-2 border-blue-400 pb-1'
                  : 'text-gray-300 hover:text-white transition'
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/lessons"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-400 font-semibold border-b-2 border-blue-400 pb-1'
                  : 'text-gray-300 hover:text-white transition'
              }
            >
              Lições
            </NavLink>

            <NavLink
              to="/progress"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-400 font-semibold border-b-2 border-blue-400 pb-1'
                  : 'text-gray-300 hover:text-white transition'
              }
            >
              Meu Progresso
            </NavLink>

            {/* Botão de Logout (opcional) */}
            <button
              onClick={logout}
              className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition"
            >
              Sair
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}