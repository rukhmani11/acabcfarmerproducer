import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";


const RequireAuth: React.FC<{ allowedRoles: string[] }> = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  const hasRole = auth?.Roles?.some((role: string) => allowedRoles.includes(role));

  if (!auth?.Token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return hasRole ? <Outlet /> : <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default RequireAuth;
