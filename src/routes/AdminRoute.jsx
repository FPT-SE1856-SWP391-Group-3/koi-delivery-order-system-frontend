import React from "react"
import PropTypes from "prop-types"
import { Navigate, Outlet } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ComponentPath from "routes/ComponentPath"

function AdminRoute() {
    // const [isAdmin, setIsAdmin] = useState(data.isAdmin);
    const user = JSON.parse(localStorage.getItem("user"))
    if (user && user.roleId >= 2) {
        return <Outlet />
    }

    return <Navigate to="/" replace />
    // console.log(isAdmin);
    // if (!isAdmin) {
    //   return <Navigate to="/" replace />;
    // }
    // return <Outlet />;
}

export default AdminRoute
