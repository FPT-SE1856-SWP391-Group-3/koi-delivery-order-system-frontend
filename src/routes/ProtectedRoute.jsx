import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';

const ProtectedRoute =  (data) => {
    const [isAuthenticated, setIsAuthenticated] = useState(data.isAuthenticated);
    console.log(isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    
    return <Outlet />;
};


export default ProtectedRoute;