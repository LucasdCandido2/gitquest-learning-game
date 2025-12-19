import { useEffect, useState } from "react";
import { progressService } from '../services/progressService';

export default function ProgressPage() {
    const [stats, setStats] = useState(null);
    const [progressList, setProgressList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                setError('');

                const [statsRes, progressRes] = await Promise.all([
                    progressService.getStats(),
                    progressService.getAllProgress(),
                ]);

                setStats(statsRes);
                setProgressList(progressRes);
            } catch (err) {
                console.error('Erro ao carregar progresso:', err);
                setError('Erro ao carregar progresso.');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Carregando progresso...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                {error}
            </div>
        );
    }

return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Meu Progresso</h1>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Total de Lições</p>
            <p className="text-3xl font-bold text-gray-800">{stats.totalLessons}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Lições Concluídas</p>
            <p className="text-3xl font-bold text-green-600">{stats.completedLessons}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Média de Score</p>
            <p className="text-3xl font-bold text-blue-600">{stats.avgScore}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Taxa de Conclusão</p>
            <p className="text-3xl font-bold text-purple-600">{stats.completionRate}%</p>
          </div>
        </div>
      )}

      {/* Progress List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Detalhes por Lição</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {progressList.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              Nenhum progresso registrado ainda.
            </div>
          ) : (
            progressList.map((p) => (
              <div key={p.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">
                    {p.lesson?.title || `Lição #${p.lessonId}`}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {p.lesson?.description || 'Sem descrição'}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Score</p>
                    <p className="text-lg font-semibold text-blue-600">{p.score ?? 0}</p>
                  </div>

                  <div>
                    {p.completed ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        ✓ Concluída
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        Em andamento
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}