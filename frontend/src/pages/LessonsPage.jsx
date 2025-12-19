import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { lessonService } from "../services/lessonService";
import { progressService } from "../services/progressService";

function LessonPage() {
    const [lessons, setLessons] = useState([]);
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [lessonsData, progressData] = await Promise.all([
                    lessonService.getAllLessons(),
                    progressService.getAllProgress()
                ]);
                setLessons(lessonsData);
                setProgress(progressData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getLessonProgress = (lessonId) => {
        return progress.find(p => p.lessonId === lessonId);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Carregando Lições...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Lições Disponiveis</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lessons.map((lesson) => {
                    const lessonProgress = getLessonProgress(lesson.id);
                    const isCompleted = lessonProgress?.completed || false;
                    const score = lessonProgress?.score || 0;

                    return (
                        <Link
                            key={lesson.id}
                            to={`/lessons/${lesson.id}`}
                            className="block bg-white rounded-lg shadow-md hover:shadow-lg trnasition-shadow p-6"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {lesson.title}
                                </h2>
                                {isCompleted && (
                                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                                        ✓ Concluída
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                                {lesson.descrition}
                            </p>

                            {isCompleted && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <p className="text-sm text-gray-600">
                                        Pontuação: <span className="font-semibold">{score}/100</span>
                                    </p>
                                </div>
                            )}
                        </Link>
                    );
                })}
            </div>
            {lessons.length === 0 && (
                <div className="text-center text-gray-600 mt-6">
                    Nenhuma lição disponivel no momento.
                </div>
            )}
        </div>
    );
}

export default LessonPage;