import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated }) => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    
    return <Outlet />;
};


export default ProtectedRoute;