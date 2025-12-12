import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import RegisterPage from './pages/RegisterPage';
import LoginForm from './components/auth/LoginForm';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Route for the registration page */}
        <Route path="/register" element={<RegisterPage />} />
        {/* Pagina de Login */}
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;