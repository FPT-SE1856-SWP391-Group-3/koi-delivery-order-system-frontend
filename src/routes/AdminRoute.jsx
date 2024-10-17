import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute({ isAdmin }) {
  console.log(isAdmin);
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}


export default AdminRoute;
