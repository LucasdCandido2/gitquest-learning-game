import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuthContext();

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;