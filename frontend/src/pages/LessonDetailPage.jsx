import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { lessonService } from '../services/lessonService';
import { progressService } from '../services/progressService';

function LessonDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [lesson, setLesson] = useState(null);
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [lessonData, progressData] = await Promise.all([
                    lessonService.getLessonById(id),
                    progressService.getProgressByLesson(id)
                ]);
                setLesson(lessonData);
                setProgress(progressData.progress);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleCompleteLesson = async () => {
        try {
            setSaving(true);
            await progressService.saveProgress(id, {
                completed: true,
                score: 100
            });

            setProgress({
                ...progress,
                completed: true,
                score: 100
            });

            console.log('Lição concluida com sucesso!');
        } catch (err) {
            console.log('Erro ao salvar progresso: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Carregando lição...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
                <button
                    onClick={() => navigate('/lessons')}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Voltar para lições
                </button>
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-center">Lição não encontrada.</div>
            </div>
        );
    }

    const isCompleted = progress?.completed || false;

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <button
                onClick={() => navigate('/lessons')}
                className="mb-4 text-blue-600 hover:text-blue-800"
            >
                ← Voltar para lições
            </button>
            <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex justify-between items-start mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {lesson.title}
                    </h1>
                    {isCompleted && (
                        <span className="bg-green-500 text-white px-3 py-1 rounded">
                            ✓ Concluída
                        </span>
                    )}
                </div>

                <p className="text-gray-600 mb-6">{lesson.description}</p>
                <div className="prose max-w-none mb-8">
                    <div 
                        className="text-gray-800 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html:lesson.content}}                    
                    />
                </div>

                {!isCompleted && (
                    <button
                        onClick={handleCompleteLesson}
                        disabled={saving}
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
                    >
                        {saving ? 'Salvando...' : 'Marcar como concluida'}
                    </button>
                )}

                {isCompleted && progress && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-800 font-semibold">
                            Você completou esta lição!
                        </p>
                        <p className="text-green-700 mt-2">
                            Pontuação: {progress.score}/100
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LessonDetailPage;