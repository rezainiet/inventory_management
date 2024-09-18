import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useUser from '../hooks/useUser'; // Adjust path as needed

const PrivateRoute = ({ element, allowedRoles }) => {
    const { user, userData, loading } = useUser();
    const location = useLocation();

    if (loading) return <div>Loading...</div>; // You can customize this or use a Loader component

    if (!user) {
        // Redirect to sign-in if not authenticated
        return <Navigate to="/auth/signin" state={{ from: location }} />;
    }

    if (allowedRoles && !allowedRoles.includes(userData?.role)) {
        // Redirect if user role is not in allowedRoles
        return <Navigate to="/" />; // Redirect to a "not authorized" page or somewhere appropriate
    }

    return element;
};

export default PrivateRoute;
