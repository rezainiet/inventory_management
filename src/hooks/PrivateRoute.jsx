import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useUser from '../hooks/useUser'; // Adjust the path if needed

const PrivateRoute = ({ children, allowed }) => {
    const { user, userData, loading, fetching } = useUser();
    const location = useLocation();

    if (loading || fetching) return <div>Loading...</div>; // Show loader if data is loading

    if (!user) {
        // Redirect to sign-in page if no user data is available (i.e., user not logged in or data not fetched)
        return <Navigate to="/auth/signin" state={{ from: location }} />;
    }

    // Check if the user's role is allowed to access this route
    if (allowed && !allowed.includes(userData?.role)) {
        // Redirect to a "Not Authorized" page if the user's role is not allowed
        return <Navigate to="/not-authorized" replace />;
    }

    // Render children if the user is authenticated and authorized
    return children;
};

export default PrivateRoute;