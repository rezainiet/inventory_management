import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useUser from '../hooks/useUser'; // Adjust the path if needed

const PrivateRoute = ({ children }) => {
    const { user, loading } = useUser();
    const location = useLocation();

    if (loading) return <div>Loading...</div>; // Optional loader while checking user authentication

    if (!user) {
        // Redirect to sign-in page if user is not authenticated
        return <Navigate to="/auth/signin" state={{ from: location }} />;
    }

    // Render children if user is authenticated
    return children;
};

export default PrivateRoute;
