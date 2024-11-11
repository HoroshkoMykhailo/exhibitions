import { Navigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store/store";
import { DataStatus } from "~/constants/constants";
import { logout } from "~/store/slices/userSlice";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, dataStatus} = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    if(!token) {
        dispatch(logout());
        return <Navigate to="/login" replace/>;
    }

    if(!isAuthenticated && (dataStatus !== DataStatus.PENDING && dataStatus !== DataStatus.IDLE)) {
        return <Navigate to="/login" replace/>;
    }

    return children;
}

export { ProtectedRoute }