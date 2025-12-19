import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { progressService } from "../services/progressService";

function DashboardPage() {
    const { user, logout } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await progressService.getStats();
                setStats(data);
            } catch (err) {
                console.error('Erro ao buscar estatisticas:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">Bem Vindo ao seu Dashboard, {user?.nome}!</h1>
            <p className="mt-4">
                Esta é uma area protegida. Apenas usuarios autenticados podem ver este conteudo.
            </p>

            {loading ? (
                <div className="mt-6">Carregando estatisticas...</div>
            ) : stats && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-100 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-800">Total de Lições</h3>
                        <p className="text-3xl font-bold text-blue-600">{stats.totalLessons}</p>
                    </div>

                    <div className="bg-green-100 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-800">Lições Concluidas</h3>
                        <p className="text-3xl font-bold text-green-600">{stats.completedLessons}</p>
                    </div>

                    <div className="bg-purple-100 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-purple-800">Pontuação Media</h3>
                        <p className="text-3xl font-bold text-purple-600">{stats.avgScore}</p>
                    </div>
                </div>
            )}

            <div className="mt-6 flex gap-4">
                <Link 
                    to='/lessons'
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Ver Lições
                </Link>
                <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Sair
                </button>
            </div>
        </div>
    );
}

export default DashboardPage;