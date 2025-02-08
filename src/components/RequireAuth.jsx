import React from 'react'
import useAuth from '../hooks/useAuth'
import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useQuery, useQueryClient } from "@tanstack/react-query";


function RequireAuth() {
    const { auth } = useAuth()
    console.log(auth)
    const location = useLocation()
    const queryClient = useQueryClient();
    const myState = queryClient.getQueryData(["user"]);
    
    return (
        auth.accessToken
            ? <Outlet />
            :
            <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth