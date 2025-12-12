import React from "react";
import { useAuthContext } from "../contexts/AuthContext";

function DashboardPage() {
    const { user, logout } = useAuthContext();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">Bem Vindo ao seu Dashboard, {user?.name}!</h1>
            <p className="mt-4">
                Esta é uma area protegida. Apenas usuarios autenticados podem ver este conteudo.
            </p>
            <button
                onClick={logout}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Sair
            </button>
        </div>
    );
}

export default DashboardPage;