import {Navigate} from "react-router";
import React from "react";
import {useJwt} from "../../../utils/useJwt.ts";
import {getRoleFromJwt} from "../../../utils/checkLogin.ts";

interface ProtectedRouteProps {
    requiredRole: string;
    children: React.ReactNode;
}

export default function ProtectedRoute({requiredRole, children}: ProtectedRouteProps) {
    const userRole = getRoleFromJwt(useJwt());
    
    if (userRole == null) {
        return <Navigate to="/login" replace />
    }

    if (requiredRole && userRole !== requiredRole){
        return <Navigate to="/" replace />;}

    return children;

}