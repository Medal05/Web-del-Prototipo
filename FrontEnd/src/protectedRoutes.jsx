import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/Auth.context";
import SidePage from "./pages/sidebar"
function ProtectedRoute() {
    const { loading, isAuth } = useAuth();

    if (loading) return (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-70 flex justify-center items-center">
            <div className="border-8 border-gray-300 border-t-blue-500 rounded-full w-20 h-20 animate-spin"></div>
        </div>
    );
    
    if (!isAuth && !loading) return <Navigate to="/login" replace />;

    return (
        <div>
            <SidePage />
            <Outlet />
        </div>
    );
}

export default ProtectedRoute;
