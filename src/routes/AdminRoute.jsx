import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


export default function AdminRoute({ isAdmin }) {
    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}