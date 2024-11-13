import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import GetAccessToken from './GetAccessToken';

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            var token = await GetAccessToken();
            setIsAuthenticated(token);
        };

        fetchToken();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};


export default ProtectedRoute;