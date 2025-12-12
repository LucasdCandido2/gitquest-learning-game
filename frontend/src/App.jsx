import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/common/Header';
import RegisterPage from './pages/RegisterPage';
import LoginForm from './components/auth/LoginForm';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          {/* Route for the registration page */}
          <Route path="/register" element={<RegisterPage />} />
          {/* Pagina de Login */}
          <Route path='/login' element={<LoginForm />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/'
            element={<Navigate to="/dashboard" replace />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;