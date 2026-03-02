import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getRoleHomePath, getUser, isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }

  if (allowedRoles.length) {
    const role = getUser()?.role;
    if (!allowedRoles.includes(role)) {
      return <Navigate to={getRoleHomePath(role)} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
