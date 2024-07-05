import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthState';

const ProtectedRoute = ({ children }) => {
    const { currentUser, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
