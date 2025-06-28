import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {

    const isAuthenticated = useSelector((state) => state.user.isLoggedIn)
    return isAuthenticated ? <Outlet /> : <Navigate to={'/'} replace />

}

export default ProtectedRoute