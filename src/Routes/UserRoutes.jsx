import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

const UserRoutes = () => {
    const role = localStorage.getItem("role")
    return (
      role === "user"? <Outlet />: <Navigate  to={"/login"} />
    )
}

export default UserRoutes