import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const location = useLocation();
    const username = sessionStorage.getItem('username');

    if (!username) {
        // Redirect them to the login page, but save the current location they were trying to go to
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}
export default ProtectedRoute;
