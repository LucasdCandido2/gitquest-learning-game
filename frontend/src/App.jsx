// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/common/Header';
import DashboardPage from './pages/DashboardPage';
import LessonsPage from './pages/LessonsPage';
import ProgressPage from './pages/ProgressPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useAuth } from './contexts/AuthContext';

function PrivateRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {user && <Header />}
      
      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rotas protegidas */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/lessons"
            element={
              <PrivateRoute>
                <LessonsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/progress"
            element={
              <PrivateRoute>
                <ProgressPage />
              </PrivateRoute>
            }
          >
          </Route>

          {/* Redirecionar raiz */}
          <Route 
            path="/" 
            element={
              user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
            } 
          />

          {/* 404 */}
          <Route 
            path="*" 
            element={
              <div className="text-center py-20">
                <h1 className="text-4xl font-bold text-gray-800">404</h1>
                <p className="text-gray-600 mt-2">Página não encontrada</p>
              </div>
            } 
          />
        </Routes>
      </main>
    </div>
  );
}