import React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

function Header() {
    const { isAuthenticated, user, logout, loading } = useAuthContext();

    return (
        <header className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    GitQuest
                </Link>
                {loading && <div>Carregando...</div>}
                {!loading && (
                    <nav className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <span>Olá, {user?.name}!</span>
                                <button
                                    onClick={logout}
                                    className="bg-red-600 houver:bg-red-700 px-4 py-2 reounded-md text-sm font-medium"
                                >
                                    Sair
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="houver:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-blue-600 houver:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Registrar
                                </Link>
                            </>
                        )}
                    </nav>
                )}
            </div>
        </header>
    );
}

export default Header;